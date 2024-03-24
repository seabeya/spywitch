import Link from 'next/link';

import IconSpyWitch from '@/components/shared/icons/IconSpyWitch';
import IconGithub from '@/components/shared/icons/IconGithub';

export default function HeaderBtn() {}

function Logo() {
  return (
    <Link href="/" className="flex max-w-fit p-1">
      <IconSpyWitch className="h-10 w-10 shrink-0 -rotate-12 sm:h-12 sm:w-12" />
      <span className="-ml-2 text-sm text-white sm:text-base">
        Spy<b className="text-purple-500">Witch</b>
      </span>
    </Link>
  );
}

HeaderBtn.Logo = Logo;

function GitHub() {
  return (
    <a
      href="https://github.com/seabeya/spywitch"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md border border-c_border1 bg-c_body px-2 py-1 text-sm text-gray-300 duration-75 hover:border-c_border2 hover:bg-gray-800 hover:text-white"
    >
      <IconGithub className="h-4 w-4 shrink-0" />
      GitHub
    </a>
  );
}

HeaderBtn.GitHub = GitHub;
