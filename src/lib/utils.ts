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

const msToTime = (milliseconds: number) => {
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
};

export { cn, isUnique, isAnyEmptyField, msToTime };
