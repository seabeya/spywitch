import { MODES } from '@/system/consts';
import { useItemsStore } from '@/system/store';
import { ModeName } from '@/system/types';

function hasAnyEmptyField(currentMode: ModeName) {
  const fields = MODES[currentMode].fields;

  for (const field of fields) {
    const items = useItemsStore.getState()[field.name];
    if (items.length === 0) {
      return true;
    }
  }

  return false;
}

export { hasAnyEmptyField };
