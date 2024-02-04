'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconChevron from '@/components/icons/IconChevron';

export default function NavBtn({ href, label }: { href: string; label: string }) {
  const currPath = usePathname();
  const isActive = currPath === href;

  return (
    <Link
      className={`group flex items-center justify-between overflow-hidden rounded-lg 
        border border-c_border1 bg-c_body px-4 py-2 text-gray-400
        hover:border-c_border2
        ${isActive ? '!border-sky-900 bg-c_active text-gray-200' : ''}`}
      href={href}
    >
      {label}
      <IconChevron
        className={`h-6 w-6 shrink-0 fill-gray-500
         ${isActive ? 'fill-sky-600' : ''}
         `}
      />
    </Link>
  );
}