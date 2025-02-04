'use client';

import { useStatusStore } from '@/system/store';

function DataStatus() {
  const status = useStatusStore();

  return (
    <div className="hidden items-center justify-center p-6 text-sm capitalize text-c-secondary-text lg:flex">
      {status}
    </div>
  );
}

export default DataStatus;
