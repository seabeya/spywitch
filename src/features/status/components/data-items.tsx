'use client';

import { MODES } from '@/system/spy';
import { useModeStore } from '@/system/store';
import DataItem from './data-item';

function DataItems() {
  const currentMode = useModeStore();

  return MODES.map((mode) => {
    if (currentMode === mode.name) {
      return mode.fields.map((field, i) => {
        return <DataItem key={i} name={field.name} />;
      });
    }
  });
}

export default DataItems;
