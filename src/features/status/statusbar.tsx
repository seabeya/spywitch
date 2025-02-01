'use client';

import { useModeStore, useStatusStore } from '@/system/store';
import StatusItem from './status-item';

function Statusbar() {
  const mode = useModeStore();
  const status = useStatusStore();

  return (
    <div className="overflow-hidden rounded-lg border border-c-line bg-c-fg">
      <div className="grid auto-cols-fr grid-flow-col divide-x divide-c-line-high bg-c-secondary sm:pt-s-gap lg:border-b lg:border-c-line-high">
        <StatusItem label={mode} data={'0'} />
        <StatusItem label={'channels'} data={'0'} />
        <StatusItem label={'up time'} data={'00:00'} />
      </div>
      <div className="hidden items-center justify-center p-6 text-sm capitalize text-c-secondary-text lg:flex">
        {status}
      </div>
    </div>
  );
}

export default Statusbar;
