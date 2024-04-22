'use client';

import clsx from 'clsx';

import { Mode } from '@/types';
import { useModeStore, useStatusStore } from '@/store';

type ModeBtnProps = {
  label: Mode;
  desc: string;
};

export default function ModeBtn({ label, desc }: ModeBtnProps) {
  const Status = useStatusStore((state) => state.status);
  const Mode = useModeStore((state) => state.mode);
  const isActive = label === Mode;

  const handleClick = () => {
    if (Status === 'idle') {
      useModeStore.setState({ mode: label });
    }
  };

  return (
    <button
      className={clsx(
        'flex cursor-not-allowed select-auto flex-col gap-[2px] overflow-hidden rounded-middle border border-brdr px-3 pb-3 pt-2 text-start',
        {
          '!cursor-default !border-brdr-active !bg-neutral-800': isActive,
          '!cursor-pointer hover:border-brdr-light': Status === 'idle',
        },
      )}
      onClick={handleClick}
    >
      <span
        className={clsx('text-sm text-txt-low xl:text-base', {
          '!text-txt-light': isActive,
          '!text-txt-lower': Status !== 'idle' && isActive === false,
        })}
      >
        {label}
      </span>
      <p
        className={clsx('text-xs text-txt-lower xl:text-sm', {
          '!text-txt-low': isActive,
          '!text-txt-last': Status !== 'idle' && isActive === false,
        })}
      >
        {desc}
      </p>
    </button>
  );
}
