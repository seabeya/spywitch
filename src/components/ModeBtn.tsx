import clsx from 'clsx';

type ModeBtnProps = {
  label: string;
  desc: string;
};

export default function ModeBtn({ label, desc }: ModeBtnProps) {
  const isActive = false;

  return (
    <button
      className={clsx(
        'rounded-middle flex flex-col gap-[2px] overflow-hidden border border-brdr px-3 pb-3 pt-2 text-start hover:border-brdr-light',
        {
          '!border-brdr-active !bg-neutral-800': isActive,
        },
      )}
    >
      <span
        className={clsx('text-sm text-txt-low xl:text-base', {
          '!text-txt-light': isActive,
        })}
      >
        {label}
      </span>
      <p
        className={clsx('text-txt-lower text-xs xl:text-sm', {
          '!text-txt-low': isActive,
        })}
      >
        {desc}
      </p>
    </button>
  );
}
