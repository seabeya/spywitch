'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useAtomValue } from 'jotai';
import { atom_isSpyOn } from '@/atoms';

import Area from '@/components/wrappers/Area';
import UserTabs from '@/components/sections/UserTabs';
import ChatLogs from '@/components/sections/ChatLogs';

import IconSpyWitch from '@/components/icons/IconSpyWitch';

export default function Page() {
  const isSpyOn = useAtomValue(atom_isSpyOn);

  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {isSpyOn ? (
        <>
          <Area.Section title="Users">
            <UserTabs activeTab={activeTab} handleTabClick={handleTabClick} />
          </Area.Section>
          <Area.Section title="Chat Logs">
            {activeTab !== '' ? (
              <ChatLogs user={activeTab} />
            ) : (
              <p className="py-6 text-center text-sm text-gray-300 xl:text-base">
                Select a user to view their chat logs.
              </p>
            )}
          </Area.Section>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 pb-5">
          <IconSpyWitch className="h-32 w-32 -rotate-12 animate-pulse grayscale xl:h-44 xl:w-44" />
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
