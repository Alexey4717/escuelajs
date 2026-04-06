import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { Toaster } from 'sonner';

import { ApolloProvider } from '@/shared/api/apollo-client/provider';
import { cn } from '@/shared/lib/styles/cn';

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
        <ApolloProvider>
          {children}
          <Toaster theme={serverDark ? 'dark' : 'light'} />
        </ApolloProvider>
      </body>
    </html>
  );
}
