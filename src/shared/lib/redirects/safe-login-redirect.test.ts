import { describe, expect, it } from 'vitest';

import { pagesPath } from '../../config/routes/$path';
import {
  loginPageUrlWithFrom,
  sanitizeLoginFromParam,
} from './safe-login-redirect';

describe('sanitizeLoginFromParam', () => {
  it('returns fallback for null/undefined', () => {
    expect(sanitizeLoginFromParam(null)).toBe(pagesPath.profile.$url().path);
    expect(sanitizeLoginFromParam(undefined)).toBe(
      pagesPath.profile.$url().path,
    );
  });

  it('returns fallback for open-redirect style paths', () => {
    expect(sanitizeLoginFromParam('//evil.com')).toBe(
      pagesPath.profile.$url().path,
    );
    expect(sanitizeLoginFromParam('///')).toBe(pagesPath.profile.$url().path);
  });

  it('returns fallback for values with scheme-like segments', () => {
    expect(sanitizeLoginFromParam('/foo:bar')).toBe(
      pagesPath.profile.$url().path,
    );
  });

  it('returns fallback for backslash pattern', () => {
    expect(sanitizeLoginFromParam('/foo:\\')).toBe(
      pagesPath.profile.$url().path,
    );
  });

  it('returns fallback for too long strings', () => {
    const long = `/${'a'.repeat(600)}`;
    expect(sanitizeLoginFromParam(long)).toBe(pagesPath.profile.$url().path);
  });

  it('accepts safe relative paths', () => {
    expect(sanitizeLoginFromParam('/profile')).toBe('/profile');
    expect(sanitizeLoginFromParam('/checkout')).toBe('/checkout');
  });
});

describe('loginPageUrlWithFrom', () => {
  it('builds login URL with from query for profile path', () => {
    const url = loginPageUrlWithFrom('/profile');
    expect(url).toContain(pagesPath.login.$url().path);
    expect(url).toContain('from=%2Fprofile');
  });
});
