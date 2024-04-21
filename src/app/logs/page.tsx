'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useStatusStore } from '@/store';
import Warn from '@/components/shared/Warn';
import ItemTabs from '@/components/sections/ItemTabs';

export default function Page() {
  const Status = useStatusStore((state) => state.status);

  const [activeTab, setActiveTab] = useState('');
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {Status === 'running' ? (
        <>
          <ItemTabs activeTab={activeTab} handleTabClick={handleTabClick} />
          {activeTab !== '' ? (
            <div>Chat Logs</div>
          ) : (
            <p className="text-center text-sm text-txt-low xl:text-base">Please select an item to view.</p>
          )}
        </>
      ) : (
        <Warn>
          You need to start the application first in order to view the chat logs. Go to the{' '}
          <Link href="/" className="text-txt-light underline">
            Spy tab
          </Link>
          .
        </Warn>
      )}
    </>
  );
}
