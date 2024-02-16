'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useAtomValue } from 'jotai';
import { atom_isSpyOn } from '@/atoms';

import Area from '@/components/wrappers/Area';
import UserTabs from '@/components/sections/UserTabs';
import ChatLogs from '@/components/sections/ChatLogs';

import Warn from '@/components/parts/Warn';

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
        <Warn>
          You need to start the application first in order to view the chat logs. Go to the{' '}
          <Link href="/spy" className="text-white underline">
            Spy tab
          </Link>
          .
        </Warn>
      )}
    </>
  );
}
