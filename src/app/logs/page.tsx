'use client';

import Link from 'next/link';

import Warn from '@/components/shared/Warn';
import { useStatusStore } from '@/store';

export default function Page() {
  const Status = useStatusStore((state) => state.status);

  return (
    <>
      {Status === 'running' ? (
        <></>
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
