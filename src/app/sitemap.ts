import type { MetadataRoute } from 'next';

import { pagesPath } from '@/shared/config/routes/$path';
import { getAppOrigin } from '@/shared/lib/app-origin';

const publicPaths = [
  pagesPath.$url().pathname,
  pagesPath.products.$url().pathname,
  pagesPath.categories.$url().pathname,
  pagesPath.users.$url().pathname,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppOrigin();
  const now = new Date();

  return publicPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: path === '/' ? 1 : 0.7,
  }));
}
