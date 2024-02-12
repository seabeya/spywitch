'use client';

import Area from '@/components/wrappers/Area';
import UserTabs from '@/components/sections/UserTabs';

import IconSpyWitch from '@/components/icons/IconSpyWitch';

import Link from 'next/link';

import { useAtomValue } from 'jotai';
import { atom_isSpyOn } from '@/atoms';

export default function Page() {
  const isSpyOn = useAtomValue(atom_isSpyOn);

  return (
    <>
      {isSpyOn ? (
        <>
          <Area.Section title="Users">
            <UserTabs />
          </Area.Section>
          <Area.Section title="Messages">
            <UserTabs />
          </Area.Section>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-6 xl:py-10">
          <IconSpyWitch className="h-44 w-44 -rotate-12 animate-pulse grayscale xl:h-56 xl:w-56" />
          <p className="max-w-xs text-center text-sm font-medium text-gray-400 xl:max-w-md xl:text-base">
            You need to start the application first in order to view the chat logs. Go to the{' '}
            <Link href="/spy" className="text-white underline">
              Spy tab
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
}
