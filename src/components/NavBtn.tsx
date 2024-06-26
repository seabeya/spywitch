'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import IconChevron from '@/components/shared/Icons/IconChevron';

type NavBtnProps = {
  href: string;
  label: string;
  icon?: JSX.Element;
};

export default function NavBtn({ href, label }: NavBtnProps) {
  const currPath = usePathname();
  const isActive = href === currPath;

  return (
    <Link
      href={href}
      className={clsx(
        'flex justify-between overflow-hidden rounded-middle border border-brdr bg-neutral-900 px-4 py-2 text-sm text-txt-low hover:border-brdr-light xl:text-base',
        {
          '!border-brdr-active !bg-neutral-800 !text-txt-light': isActive,
        },
      )}
    >
      {label}
      <IconChevron
        className={clsx('h-6 w-6 shrink-0 text-txt-lower', {
          '!text-txt-low': isActive,
        })}
      />
    </Link>
  );
}

function Bottom({ href, label, icon }: NavBtnProps) {
  const currPath = usePathname();
  const isActive = href === currPath;

  return (
    <Link
      href={href}
      className={clsx('flex flex-col items-center py-2 text-sm text-txt-lower hover:text-txt-low', {
        '!text-sky-500': isActive,
      })}
    >
      {icon}
      {label}
    </Link>
  );
}

NavBtn.Bottom = Bottom;
