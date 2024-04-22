'use client';

import { useEffect, useState } from 'react';

import StatusInfo from '@/components/StatusInfo';
import { useItemsStore, useModeStore, useStatusStore } from '@/store';
import { formatMilliseconds } from '@/lib/utils';

export default function Statusbar() {
  const Status = useStatusStore((state) => state.status);
  const Mode = useModeStore((state) => state.mode);

  let items1Count = 0;
  let items2Count = 0;

  if (Status === 'running') {
    items1Count = Mode === 'Users' ? useItemsStore.getState().users.length : useItemsStore.getState().events.length;
    items2Count = useItemsStore.getState().channels.length;
  }

  const [uptime, setUptime] = useState('00:00');

  useEffect(() => {
    if (Status !== 'running') {
      setUptime('00:00');
      return;
    }

    const startTime = new Date();

    const intervalId = setInterval(() => {
      const diff = new Date().getTime() - startTime.getTime();
      setUptime(() => {
        return formatMilliseconds(diff);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [Status]);

  return (
    <div className="overflow-hidden rounded-outher border border-brdr bg-neutral-950">
      <div className="sm:pt-3 lg:border-b lg:border-brdr-light lg:bg-brdr-dark xl:pt-5">
        <div className="grid grid-cols-3 divide-x divide-brdr text-ellipsis *:overflow-hidden lg:divide-brdr-light">
          <StatusInfo label={Mode} value={items1Count.toString()} />
          <StatusInfo label="Channels" value={items2Count.toString()} />
          <StatusInfo label="Up Time" value={uptime} />
        </div>
      </div>
      <div className="hidden py-4 text-center text-sm capitalize text-txt-low lg:block xl:py-8 xl:text-base">
        {Status}
      </div>
    </div>
  );
}
