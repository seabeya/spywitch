'use client';

import { useEffect, useState } from 'react';
import StatusInfo from './status-info';
import { useIsActiveStore } from '@/system/store';
import { msToTime } from '@/lib/utils';

function DataTime() {
  const [uptime, setUptime] = useState('00:00');

  const isActive = useIsActiveStore();

  useEffect(() => {
    if (!isActive) {
      setUptime('00:00');
      return;
    }

    const startTime = new Date();

    const interval = setInterval(() => {
      const diff = new Date().getTime() - startTime.getTime();
      setUptime(() => {
        return msToTime(diff);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return <StatusInfo label={'up time'} data={uptime} />;
}

export default DataTime;
