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

export { cn, isUnique };
