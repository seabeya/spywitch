import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Provider } from 'jotai';

import Container from '@/components/layout/Container';

import Header from '@/components/zone/Header';
import Sidebar from '@/components/zone/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://spywitch.seabeya.com'),
  title: 'SpyWitch',
  description: "An open-source tool to track users' chat messages on Twitch.tv.",
  keywords: [
    'spywitch',
    'twitch',
    'chat',
    'messages',
    'track',
    'open-source',
    'tool',
    'osint-tool',
    'osint',
    'twitch-chat',
  ],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'SpyWitch',
    description: "An open-source tool to track users' chat messages on Twitch.tv.",
    siteName: 'SpyWitch',
    images: [
      {
        url: '/icon-96x96.png',
        alt: 'SpyWitch',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100svh] bg-gradient-to-br from-c_body via-c_body to-c_body2`}>
        <Header />
        <Provider>
          <Container>
            <main className="grid grid-cols-1 items-start gap-3 pb-16 pt-3 sm:gap-5 sm:pt-5 lg:grid-cols-7 lg:pb-5">
              <div className="sticky top-1 z-10 sm:static lg:col-start-1 lg:col-end-3">
                <Sidebar />
              </div>
              <div className="flex flex-col gap-16 rounded-xl border border-c_border1 bg-c_main p-5 lg:col-start-3 lg:col-end-8">
                {children}
              </div>
            </main>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
