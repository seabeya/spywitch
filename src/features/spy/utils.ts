import { MODES } from '@/system/spy';
import { useItemsStore } from '@/system/store';
import { ModeName } from '@/system/types';

function hasAnyEmptyField(currentMode: ModeName) {
  for (const mode of MODES) {
    if (mode.name === currentMode) {
      for (const field of mode.fields) {
        const items = useItemsStore.getState()[field.name];
        if (items.length === 0) {
          return true;
        }
      }
    }
  }

  return false;
}

export { hasAnyEmptyField };
