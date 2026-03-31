import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { ThemeBootstrapScript } from '@/app/theme-bootstrap';

import { ApolloProvider } from '@/shared/api/apollo-provider';
import { cn } from '@/shared/lib/styles/cn';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Escuela.io',
  description: 'Витрина на Next.js и GraphQL API Escuela (JWT, BFF /api/graphql).',
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
      <head>
        <ThemeBootstrapScript />
      </head>
      <body className="flex min-h-full flex-col">
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
