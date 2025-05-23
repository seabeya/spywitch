'use client';

import PageArea from '@/components/layout/page-area';
import Section from '@/components/layout/section';
import PageFeedback from '@/components/page-feedback';
import ItemTabs from '@/features/monitor/item-tabs';
import Logs from '@/features/monitor/logs';
import { MODES } from '@/system/consts';
import { SYS_PAGES } from '@/system/pages';
import { useIsActiveStore, useModeStore } from '@/system/store';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const currentStatus = useIsActiveStore();
  const filterBy = MODES[useModeStore.getState()].filterBy;

  const [selectedItem, setSelectedItem] = useState('');

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <PageArea>
      {currentStatus ? (
        <>
          <Section title={`${filterBy}s`}>
            <ItemTabs filterBy={filterBy} selectedItem={selectedItem} selectHandler={handleSelect} />
          </Section>
          <Section title="Logs">
            {selectedItem.length > 0 ? (
              <Logs target={selectedItem} filterBy={filterBy} />
            ) : (
              <PageFeedback>
                <p>Please select an item to view.</p>
              </PageFeedback>
            )}
          </Section>
        </>
      ) : (
        <PageFeedback>
          <p className="max-w-72">
            {'You need to start the application first. Please go to the '}
            <Link href={SYS_PAGES.setup.path} className="underline hover:text-c-secondary-text">
              {SYS_PAGES.setup.name} page
            </Link>
            .
          </p>
        </PageFeedback>
      )}
    </PageArea>
  );
}
