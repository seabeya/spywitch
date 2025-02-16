'use client';

import PageArea from '@/components/layout/page-area';
import Section from '@/components/layout/section';
import PageFeedback from '@/components/page-feedback';
import { MODES } from '@/system/consts';
import { SYS_PAGES } from '@/system/pages';
import { useIsActiveStore, useModeStore } from '@/system/store';
import Link from 'next/link';

export default function Page() {
  const currentStatus = useIsActiveStore();

  return (
    <PageArea>
      {currentStatus ? (
        <>
          <Section title={`${MODES[useModeStore.getState()].filterBy}s`}>A</Section>
          <Section title="Command">B</Section>
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
