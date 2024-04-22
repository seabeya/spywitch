import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Header from '@/components/general/Header';
import Sidebar from '@/components/general/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://spywitch.seabeya.com'),
  title: 'SpyWitch',
  description: 'An open-source live data tracker for Twitch.tv',
  keywords: [
    'spywitch',
    'twitch',
    'chat',
    'messages',
    'events',
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
    description: 'An open-source live data tracker for Twitch.tv',
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
      <body className={`${inter.className} min-h-[100svh] bg-black`}>
        <Header />
        <main className="container grid grid-cols-1 items-start gap-3 pb-20 pt-3 sm:gap-5 sm:pt-5 lg:grid-cols-7 lg:pb-5">
          {/* Sidebar Area: */}
          <div className="sticky top-1 z-10 sm:static lg:col-start-1 lg:col-end-3">
            <Sidebar />
          </div>
          {/* Page Content Area: */}
          <div className="lg:col-start-3 lg:col-end-8">
            <div className="flex flex-col gap-16 overflow-hidden rounded-outher border border-brdr bg-neutral-950 p-5">
              {children}
            </div>
            <p className="px-2 pt-1 text-right text-xs text-txt-lower">SpyWitch is not affiliated with Twitch.</p>
          </div>
        </main>
      </body>
    </html>
  );
}
