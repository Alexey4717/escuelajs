/**
 * Origin приложения для абсолютных URL к `/api/*` при SSR (Apollo HttpLink).
 * В проде задать `NEXT_PUBLIC_APP_URL` (например `https://example.com`).
 */
export const getAppOrigin = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};
