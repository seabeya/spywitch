'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useStatusStore } from '@/store';
import Warn from '@/components/shared/Warn';
import ItemTabs from '@/components/sections/ItemTabs';
import Logs from '@/components/sections/Logs';

export default function Page() {
  const Status = useStatusStore((state) => state.status);

  const [selectedItem, setSelectedItem] = useState('');
  const handleTabClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <>
      {Status === 'running' ? (
        <>
          <ItemTabs activeTab={selectedItem} handleTabClick={handleTabClick} />
          {selectedItem !== '' ? (
            <Logs target={selectedItem} />
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
