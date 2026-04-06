import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #334155 100%)',
        color: '#f8fafc',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
      }}
    >
      <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: '-0.04em' }}>
        Escuela.io
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 34,
          fontWeight: 500,
          opacity: 0.92,
          maxWidth: 900,
          textAlign: 'center',
          lineHeight: 1.25,
        }}
      >
        Интернет-магазин одежды и электроники
      </div>
    </div>,
    { ...size },
  );
}
