'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { atom_channelsArr, atom_isSpyOn, atom_usersArr } from '@/atoms';

import { formatMilliseconds } from '@/lib/utils';

function Info({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-max flex-1 flex-row-reverse items-center justify-end gap-1 overflow-hidden px-2 pb-2 pt-2 sm:flex-col sm:items-stretch sm:justify-stretch sm:gap-0 sm:px-4 sm:pt-0">
      <span className="w-0 text-sm font-medium text-gray-300 xl:text-base" suppressHydrationWarning={true}>
        {value}
      </span>
      <span className="text-xs text-gray-400 xl:text-sm">{label}</span>
    </div>
  );
}

export default function Statusbar() {
  const userCount = useAtomValue(atom_usersArr).length.toString();
  const channelsCount = useAtomValue(atom_channelsArr).length.toString();
  const isSpyOn = useAtomValue(atom_isSpyOn);

  const [uptime, setUptime] = useState('00:00');

  useEffect(() => {
    if (!isSpyOn) {
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
  }, [isSpyOn]);

  return (
    <div className="overflow-hidden rounded-xl border border-c_border1 bg-c_main">
      <div className="border-c_border2 sm:pt-3 lg:border-b lg:bg-c_body xl:pt-5">
        <div className="flex divide-x divide-c_border1 lg:divide-c_border2">
          <Info value={userCount} label="Users" />
          <Info value={channelsCount} label="Channels" />
          <Info value={uptime} label="Up Time" />
        </div>
      </div>
      <div className="hidden py-4 text-center text-sm text-gray-300 lg:block xl:py-8 xl:text-base">
        {isSpyOn ? 'Activated' : 'Not Activated'}
      </div>
    </div>
  );
}
