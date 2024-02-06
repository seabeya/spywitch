import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconChevron from '@/components/icons/IconChevron';

type NavBtnProps = { href: string; label: string; icon?: JSX.Element };

export default function NavBtn({ href, label }: NavBtnProps) {
  const currPath = usePathname();
  const isActive = currPath === href;

  return (
    <Link
      className={`group flex justify-between overflow-hidden rounded-lg
        border border-c_border1 bg-c_body px-4 py-2 text-sm text-gray-400 hover:border-c_border2
        xl:text-base
        ${isActive ? '!border-sky-900 !bg-c_active !text-gray-200' : ''}`}
      href={href}
    >
      {label}
      <IconChevron
        className={`h-6 w-6 shrink-0 fill-gray-500
         ${isActive ? '!fill-sky-600' : ''}
         `}
      />
    </Link>
  );
}

function Fixed({ href, label, icon }: NavBtnProps) {
  const currPath = usePathname();
  const isActive = currPath === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center py-2 text-sm text-gray-400 
      hover:text-gray-300
    ${isActive ? '!text-sky-500' : ''}`}
    >
      {icon}
      {label}
    </Link>
  );
}

NavBtn.Fixed = Fixed;
