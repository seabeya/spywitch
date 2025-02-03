import { ModeName, MODES } from '@/system/spy';
import { useInputStore } from '@/system/store';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isUnique = (arr: string[], input: string) => {
  if (new Set(arr).has(input)) {
    return false;
  }
  return true;
};

const isAnyEmptyField = (currMode: ModeName) => {
  for (const mode of MODES) {
    if (mode.name === currMode) {
      for (const field of mode.fields) {
        const input = useInputStore.getState()[field.name];
        if (input.length === 0) {
          return true;
        }
      }
    }
  }

  return false;
};

export { cn, isUnique, isAnyEmptyField };
