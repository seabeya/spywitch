import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spywitch.sh2a.org'),
  title: 'SpyWitch',
  description: 'An open-source live data tracker for Twitch.tv',
  keywords: ['spywitch', 'twitch', 'chat', 'messages', 'data-tracker', 'moderation-tool', 'open-source'],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'SpyWitch',
    description: 'An open-source live data tracker for Twitch.tv',
    siteName: 'SpyWitch',
    images: [
      {
        url: '/icons/icon-96x96.png',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
