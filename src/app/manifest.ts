import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Escuela Storefront Demo',
    short_name: 'Escuela',
    description:
      'Educational Next.js storefront showcasing rendering strategies and metadata.',
    start_url: '/',
    display: 'standalone',
    background_color: '#191B28',
    theme_color: '#ef4444',
    icons: [
      {
        src: '/images/onboarding-demo-product-a.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/images/onboarding-demo-product-b.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
