import type { Metadata } from 'next';

import { getAppOrigin } from '../app-origin';

interface BuildPageMetadataArgs {
  title: string;
  description?: string;
  path?: string;
  images?: string[];
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export const getMetadataBase = (): URL => new URL(getAppOrigin());

export const buildPageMetadata = ({
  title,
  description,
  path,
  images = [],
  type = 'website',
  noIndex = false,
}: BuildPageMetadataArgs): Metadata => {
  const cleanPath = path?.startsWith('/')
    ? path
    : path
      ? `/${path}`
      : undefined;
  const pageUrl = cleanPath ? `${getAppOrigin()}${cleanPath}` : undefined;

  const metadata: Metadata = {
    title,
    ...(description ? { description } : {}),
    ...(pageUrl
      ? {
          alternates: { canonical: cleanPath },
          openGraph: {
            title,
            ...(description ? { description } : {}),
            url: pageUrl,
            type,
            ...(images.length > 0
              ? { images: images.map((image) => ({ url: image })) }
              : {}),
          },
        }
      : {}),
    ...(description
      ? {
          twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(images.length > 0 ? { images } : {}),
          },
        }
      : {}),
    ...(noIndex
      ? { robots: { index: false, follow: false, nocache: true } }
      : {}),
  };

  return metadata;
};
interface BuildNoIndexMetadataArgs {
  title: string;
  description?: string;
}

export const buildNoIndexMetadata = ({
  title,
  description,
}: BuildNoIndexMetadataArgs): Metadata =>
  buildPageMetadata({ title, description, noIndex: true });
