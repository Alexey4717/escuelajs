/**
 * BFF-прокси GET к публичному REST Escuela (`ESCUELA_REST_API_BASE_URL`).
 *
 * **CORP:** файлы с `api.escuelajs.co` отдаются с `Cross-Origin-Resource-Policy: same-origin` —
 * прямой `<img src="https://api…">` с другого origin не рисуется; клиент ходит на `/api/escuela-rest/…`.
 */
import { NextRequest, NextResponse } from 'next/server';

import type { IncomingMessage } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { URL } from 'node:url';

import { ESCUELA_REST_API_BASE_URL } from '@/shared/config/consts/escuela-rest';

const PATH_TRAVERSAL = /\.\.|%2e%2e/i;
const MAX_BODY_BYTES = 25 * 1024 * 1024;
/** Иногда один поток "душится" — маленькие диапазоны по отдельным сокетам идут быстрее. */
const RANGE_CHUNK_BYTES = 4096;
const PER_REQUEST_MS = 45_000;

function upstreamUrl(segments: string[]): string | null {
  const joined = segments.join('/');
  if (!joined || PATH_TRAVERSAL.test(joined)) {
    return null;
  }
  const base = ESCUELA_REST_API_BASE_URL.replace(/\/$/, '');
  return `${base}/${joined}`;
}

function collectBody(res: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    res.on('data', (c: Buffer) => chunks.push(c));
    res.on('end', () => resolve(Buffer.concat(chunks)));
    res.on('error', reject);
  });
}

type HeadOk = {
  ok: true;
  length: number;
  contentType: string;
  acceptRanges: boolean;
};
type Err = { ok: false; status: number; text: string };

function httpsHead(parsed: URL): Promise<HeadOk | Err> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (r: HeadOk | Err) => {
      if (settled) return;
      settled = true;
      resolve(r);
    };

    const req = httpsRequest(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: `${parsed.pathname}${parsed.search}`,
        method: 'HEAD',
        timeout: PER_REQUEST_MS,
        family: 4,
        headers: { 'User-Agent': 'escuelajs-bff/escuela-rest' },
      },
      (res) => {
        const status = res.statusCode ?? 502;
        res.resume();

        if (status !== 200) {
          res.on('close', () =>
            done({ ok: false, status, text: 'Upstream HEAD error' }),
          );
          return;
        }

        const rawCl = res.headers['content-length'];
        const length =
          typeof rawCl === 'string' ? Number.parseInt(rawCl, 10) : NaN;
        if (
          !Number.isFinite(length) ||
          length <= 0 ||
          length > MAX_BODY_BYTES
        ) {
          res.on('close', () =>
            done({ ok: false, status: 502, text: 'Invalid Content-Length' }),
          );
          return;
        }

        const rawCt = res.headers['content-type'];
        const contentType =
          typeof rawCt === 'string'
            ? (rawCt.split(';')[0]?.trim() ?? 'application/octet-stream')
            : 'application/octet-stream';

        const ar = res.headers['accept-ranges'];
        const acceptRanges =
          typeof ar === 'string' && ar.toLowerCase().includes('bytes');

        res.on('close', () => {
          done({ ok: true, length, contentType, acceptRanges });
        });
      },
    );

    req.on('timeout', () => {
      req.destroy();
      done({ ok: false, status: 504, text: 'HEAD timeout' });
    });
    req.on('error', () => {
      done({ ok: false, status: 502, text: 'HEAD unreachable' });
    });
    req.end();
  });
}

function httpsGetRange(
  parsed: URL,
  start: number,
  endInclusive: number,
): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const req = httpsRequest(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: `${parsed.pathname}${parsed.search}`,
        method: 'GET',
        timeout: PER_REQUEST_MS,
        family: 4,
        headers: {
          Range: `bytes=${start}-${endInclusive}`,
          Accept: 'image/*,*/*;q=0.8',
          'User-Agent': 'escuelajs-bff/escuela-rest',
        },
      },
      async (res) => {
        const status = res.statusCode ?? 0;
        if (status !== 206 && status !== 200) {
          res.resume();
          resolve(null);
          return;
        }
        try {
          const buf = await collectBody(res);
          resolve(buf);
        } catch {
          resolve(null);
        }
      },
    );

    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
    req.on('error', () => resolve(null));
    req.end();
  });
}

async function httpsGetBinaryParallel(
  parsed: URL,
): Promise<{ ok: true; contentType: string; body: Buffer } | Err> {
  const head = await httpsHead(parsed);
  if (!head.ok) {
    return head;
  }

  const { length, contentType, acceptRanges } = head;

  if (!acceptRanges || length <= RANGE_CHUNK_BYTES) {
    const single = await httpsGetRange(parsed, 0, length - 1);
    if (single == null || single.length !== length) {
      return { ok: false, status: 502, text: 'Upstream read failed' };
    }
    return { ok: true, contentType, body: single };
  }

  const ranges: { start: number; end: number }[] = [];
  for (let start = 0; start < length; start += RANGE_CHUNK_BYTES) {
    const end = Math.min(start + RANGE_CHUNK_BYTES - 1, length - 1);
    ranges.push({ start, end });
  }

  const parts = await Promise.all(
    ranges.map(async ({ start, end }) => {
      let buf = await httpsGetRange(parsed, start, end);
      if (buf == null || buf.length !== end - start + 1) {
        buf = await httpsGetRange(parsed, start, end);
      }
      return buf;
    }),
  );

  for (let j = 0; j < parts.length; j++) {
    const buf = parts[j];
    const r = ranges[j]!;
    if (buf == null || buf.length !== r.end - r.start + 1) {
      return { ok: false, status: 502, text: 'Parallel range failed' };
    }
  }

  const body = Buffer.concat(parts as Buffer[]);

  if (body.length !== length) {
    return { ok: false, status: 502, text: 'Size mismatch' };
  }

  return { ok: true, contentType, body };
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const target = upstreamUrl(path);
  if (target == null) {
    return new NextResponse('Invalid path', { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new NextResponse('Bad URL', { status: 400 });
  }

  if (parsed.protocol !== 'https:') {
    return new NextResponse('HTTPS only', { status: 400 });
  }

  const result = await httpsGetBinaryParallel(parsed);
  if (!result.ok) {
    return new NextResponse(result.text, { status: result.status });
  }

  return new NextResponse(new Uint8Array(result.body), {
    status: 200,
    headers: {
      'Content-Type': result.contentType,
      'Content-Length': String(result.body.length),
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
