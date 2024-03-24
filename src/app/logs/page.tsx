'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useAtomValue } from 'jotai';
import { atom_status } from '@/atoms';

import Warn from '@/components/shared/Warn';

import UserTabs from './UserTabs';
import ChatLogs from './ChatLogs';

export default function Page() {
  const status = useAtomValue(atom_status);

  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {status.running ? (
        <>
          <UserTabs activeTab={activeTab} handleTabClick={handleTabClick} />
          {activeTab !== '' ? (
            <ChatLogs user={activeTab} />
          ) : (
            <p className="text-center text-sm text-gray-300 xl:text-base">Select a user to view their chat logs.</p>
          )}
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
