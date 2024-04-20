'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import IconChevron from '@/components/shared/Icons/IconChevron';

type NavBtnProps = {
  href: string;
  label: string;
};

export default function NavBtn({ href, label }: NavBtnProps) {
  const currPath = usePathname();
  const isActive = href === currPath;

  return (
    <Link
      href={href}
      className={clsx(
        'rounded-middle flex justify-between overflow-hidden border border-brdr bg-neutral-900 px-4 py-2 text-sm text-txt-low hover:border-brdr-light xl:text-base',
        {
          '!border-brdr-active !bg-neutral-800 !text-txt-light': isActive,
        },
      )}
    >
      {label}
      <IconChevron
        className={clsx('text-txt-lower h-6 w-6 shrink-0', {
          '!text-txt-low': isActive,
        })}
      />
    </Link>
  );
}
