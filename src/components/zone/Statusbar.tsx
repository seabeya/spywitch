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
    if (!status.running) {
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
  }, [status.running]);

  return (
    <div className="overflow-hidden rounded-xl border border-c_border1 bg-c_main">
      <div className="border-c_border2 sm:pt-3 lg:border-b lg:bg-c_body xl:pt-5">
        <div className="flex divide-x divide-c_border1 lg:divide-c_border2">
          <StatusInfo value={status.count1.toString()} label="Users" />
          <StatusInfo value={status.count2.toString()} label="Channels" />
          <StatusInfo value={uptime} label="Up Time" />
        </div>
      </div>
      <div className="hidden py-4 text-center text-sm text-gray-300 lg:block xl:py-8 xl:text-base">
        {status.running ? 'Activated' : 'Not Activated'}
      </div>
    </div>
  );
}
