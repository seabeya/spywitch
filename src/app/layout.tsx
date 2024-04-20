import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Header from '@/components/general/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '',
  description: '',
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
        <main className="container grid grid-cols-1 items-start gap-3 pb-5 pt-3 sm:gap-5 sm:pt-5 lg:grid-cols-7">
          {/* Sidebar Area: */}
          <div className="sticky top-1 z-10 rounded-outher border border-brdr bg-neutral-950 sm:static lg:col-start-1 lg:col-end-3">
            Sidebar
          </div>
          {/* Page Content Area: */}
          <div className="flex flex-col gap-16 rounded-outher border border-brdr bg-neutral-950 p-5 lg:col-start-3 lg:col-end-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
