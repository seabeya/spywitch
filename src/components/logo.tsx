import Link from 'next/link';
import IconSpyWitch from './icons/spywitch';
import { SYS_PAGES } from '@/system/pages';

function Logo() {
  return (
    <Link href={SYS_PAGES.home.path} className="flex">
      <IconSpyWitch className="size-11 shrink-0 -rotate-12" />
      <span className="-ml-2 text-sm">
        <span className="text-c-primary-text">Spy</span>
        <span className="font-semibold text-purple-500">Witch</span>
      </span>
    </Link>
  );
}

export default Logo;
