'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { atom_status } from '@/atoms';

import { formatMilliseconds } from '@/lib/utils';

import StatusInfo from '@/components/StatusInfo';

export default function Statusbar() {
  const status = useAtomValue(atom_status);

  const [uptime, setUptime] = useState('00:00');

  useEffect(() => {
    if (!status.active) {
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
  }, [status.active]);

  return (
    <div className="overflow-hidden rounded-xl border border-c_border1 bg-c_main">
      <div className="border-c_border2 sm:pt-3 lg:border-b lg:bg-c_body xl:pt-5">
        <div className="flex divide-x divide-c_border1 lg:divide-c_border2">
          <StatusInfo value={status.uCount.toString()} label="Users" />
          <StatusInfo value={status.cCount.toString()} label="Channels" />
          <StatusInfo value={uptime} label="Up Time" />
        </div>
      </div>
      <div className="hidden py-4 text-center text-sm text-gray-300 lg:block xl:py-8 xl:text-base">
        {status.active ? 'Activated' : 'Not Activated'}
      </div>
    </div>
  );
}
