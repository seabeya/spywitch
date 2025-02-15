'use client';

import { MODES } from '@/system/consts';
import { useModeStore } from '@/system/store';
import DataItem from './data-item';

function DataItems() {
  const currentMode = useModeStore();
  const fields = MODES[currentMode].fields;

  return fields.map((field, i) => {
    return <DataItem key={i} name={field.name} />;
  });
}

export default DataItems;
