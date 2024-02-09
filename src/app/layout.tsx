import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Provider } from 'jotai';

import { Header } from '@/components/Header';
import Area from '@/components/wrappers/Area';
import Sidebar from '@/components/Sidebar';

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
          <Area>
            <Area.Side>
              <Sidebar />
            </Area.Side>
            <Area.Page>{children}</Area.Page>
          </Area>
        </Provider>
      </body>
    </html>
  );
}
