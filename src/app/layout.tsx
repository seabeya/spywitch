import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/Header';
import Area from '@/components/wrappers/Area';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '-',
  description: '-',
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
        <Area>
          <Area.Side>
            <Sidebar />
          </Area.Side>
          <Area.Page>{children}</Area.Page>
        </Area>
      </body>
    </html>
  );
}
