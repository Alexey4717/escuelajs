/** @vitest-environment node */
import { describe, expect, it } from 'vitest';

import { getSubFromAccessToken } from './jwt-payload-sub';

/** JWT header.payload.sig — payload JSON { "sub": "user-123" } */
function makeJwtWithSub(sub: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'none' }), 'utf8').toString(
    'base64url',
  );
  const payload = Buffer.from(JSON.stringify({ sub }), 'utf8').toString(
    'base64url',
  );
  return `${header}.${payload}.sig`;
}

describe('getSubFromAccessToken', () => {
  it('returns null for empty input', () => {
    expect(getSubFromAccessToken(undefined)).toBeNull();
    expect(getSubFromAccessToken('')).toBeNull();
    expect(getSubFromAccessToken('   ')).toBeNull();
  });

  it('returns null for malformed token', () => {
    expect(getSubFromAccessToken('not-a-jwt')).toBeNull();
    expect(getSubFromAccessToken('a.b')).toBeNull();
  });

  it('extracts sub from valid JWT payload segment', () => {
    const token = makeJwtWithSub('user-abc');
    expect(getSubFromAccessToken(token)).toBe('user-abc');
  });

  it('returns null when sub is missing', () => {
    const header = Buffer.from('{}', 'utf8').toString('base64url');
    const payload = Buffer.from(JSON.stringify({}), 'utf8').toString(
      'base64url',
    );
    expect(getSubFromAccessToken(`${header}.${payload}.x`)).toBeNull();
  });
});
