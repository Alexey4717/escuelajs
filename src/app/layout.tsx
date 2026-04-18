import { type ReactNode } from 'react';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';

import { Toaster } from 'sonner';

import { ApolloProvider } from '@/shared/api/apollo-client/provider';
import { QueryProvider } from '@/shared/api/query-client/query-provider';
import { getMetadataBase } from '@/shared/lib/seo';
import { cn } from '@/shared/lib/styles/cn';

import { ModalProvider } from '@/app/modal/ui/ModalProvider';

import './globals.css';
import { ThemeBootstrapScript } from './theme-bootstrap';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: 'Escuela.io',
  description:
    'Escuela storefront built with Next.js and GraphQL API (JWT, BFF /api/graphql).',
  manifest: '/manifest.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const themeCookie = (await cookies()).get('theme')?.value;
  const serverDark = themeCookie === 'dark';
  const requestHeaders = await headers();
  const { device } = userAgent({ headers: requestHeaders });
  const serverIsMobile = device.type === 'mobile';

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={serverDark ? 'dark' : 'light'}
      className={cn(
        geistSans.variable,
        geistMono.variable,
        'h-full antialiased',
        serverDark && 'dark',
      )}
    >
      <body className="flex min-h-dvh flex-col overflow-y-auto bg-background font-sans text-[14px] text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[10060] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <ThemeBootstrapScript />
        <QueryProvider>
          <ApolloProvider>
            <ModalProvider initialIsMobile={serverIsMobile}>
              {children}
              <Toaster theme={serverDark ? 'dark' : 'light'} />
            </ModalProvider>
          </ApolloProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
