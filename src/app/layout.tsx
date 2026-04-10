import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';

import { Toaster } from 'sonner';

import { ApolloProvider } from '@/shared/api/apollo-client/provider';
import { QueryProvider } from '@/shared/api/query-client/query-provider';
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

function getSiteUrlForMetadata(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

const siteUrl = getSiteUrlForMetadata();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Escuela.io',
  description:
    'Витрина на Next.js и GraphQL API Escuela (JWT, BFF /api/graphql).',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
