'use client';

import StatusInfo from '@/components/StatusInfo';
import { useStatusStore } from '@/store';

export default function Statusbar() {
  const Status = useStatusStore((state) => state.status);

  return (
    <div className="overflow-hidden rounded-outher border border-brdr bg-neutral-950">
      <div className="sm:pt-3 lg:border-b lg:border-brdr-light lg:bg-brdr-dark xl:pt-5">
        <div className="grid grid-cols-3 divide-x divide-brdr text-ellipsis *:overflow-hidden lg:divide-brdr-light">
          <StatusInfo label="Users" value="0" />
          <StatusInfo label="Channels" value="0" />
          <StatusInfo label="Up Time" value="00:00" />
        </div>
      </div>
      <div className="hidden py-4 text-center text-sm capitalize text-txt-low lg:block xl:py-8 xl:text-base">
        {Status}
      </div>
    </div>
  );
}
