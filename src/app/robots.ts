import type { MetadataRoute } from 'next';

import { getAppOrigin } from '@/shared/lib/app-origin';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin-panel',
        '/profile',
        '/profile/*',
        '/login',
        '/register',
        '/products/create',
        '/products/*/edit',
        '/categories/create',
        '/categories/*/edit',
      ],
    },
    sitemap: `${getAppOrigin()}/sitemap.xml`,
  };
}
