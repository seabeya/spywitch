import Link from 'next/link';

import IconSpyWitch from '@/components/shared/Icons/IconSpyWitch';
import IconGithub from '@/components/shared/Icons/IconGithub';

export default function Header() {
  return (
    <header className="border-b border-brdr bg-black sm:sticky sm:top-0 sm:z-20">
      <div className="container flex h-full items-center justify-between px-2 py-1">
        <Logo />
        <GitHub />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/" className="group flex">
      <IconSpyWitch className="h-10 w-10 shrink-0 -rotate-12 sm:h-12 sm:w-12" />
      <span className="-ml-2 text-sm text-txt sm:text-base">
        Spy<b className="text-purple-500">Witch</b>
      </span>
    </Link>
  );
}

function GitHub() {
  return (
    <a
      href="https://github.com/seabeya/spywitch"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-inner border border-brdr-dark bg-neutral-950 px-2 py-1 text-sm text-txt-low duration-75 hover:border-brdr hover:text-txt"
    >
      <IconGithub className="h-4 w-4 shrink-0" />
      GitHub
    </a>
  );
}
