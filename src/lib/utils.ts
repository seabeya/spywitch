import { MODES } from '@/system/spy';
import { useItemsStore } from '@/system/store';
import { ModeName } from '@/system/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isUnique(arr: string[], input: string) {
  if (new Set(arr).has(input)) {
    return false;
  }
  return true;
}

function isAnyEmptyField(currentMode: ModeName) {
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

function msToTime(milliseconds: number) {
  const remainder = milliseconds % (1000 * 60 * 60);

  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(remainder / (1000 * 60));
  const seconds = Math.floor((remainder % (1000 * 60)) / 1000);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours.toString().padStart(2, '0')}:`;
  }

  formattedTime += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime;
}

export { cn, isUnique, isAnyEmptyField, msToTime };
