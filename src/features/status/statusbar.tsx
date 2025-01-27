'use client';

import { useModeStore } from '@/system/store';
import StatusItem from './status-item';

function Statusbar() {
  const currentMode = useModeStore();

  return (
    <div className="overflow-hidden rounded-lg border border-c-line bg-c-fg">
      <div className="grid auto-cols-fr grid-flow-col divide-x divide-c-line-high bg-c-secondary sm:pt-s-gap lg:border-b lg:border-c-line-high">
        {currentMode !== 'everything' ? <StatusItem label={currentMode} data={'0'} /> : null}
        <StatusItem label={'channels'} data={'0'} />
        <StatusItem label={'up time'} data={'00:00'} />
      </div>
      <div className="hidden items-center justify-center p-6 text-c-secondary-text lg:flex">Idle</div>
    </div>
  );
}

export default Statusbar;
