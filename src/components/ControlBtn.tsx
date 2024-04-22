import IconStart from '@/components/shared/Icons/IconStart';
import IconStop from '@/components/shared/Icons/IconStop';

type ControlBtnProps = {
  variant: 'start' | 'stop';
  isDisabled: boolean;
  onClick: () => void;
};

const variants = {
  start: {
    label: 'Start',
    icon: <IconStart className="-mb-[1px] h-3 w-3" />,
    style: 'bg-purple-700 hover:bg-purple-600',
  },
  stop: {
    label: 'Stop',
    icon: <IconStop className="-mb-[1px] h-3 w-3" />,
    style: 'bg-red-700 hover:bg-red-600',
  },
};

export default function ControlBtn({ variant, isDisabled, onClick }: ControlBtnProps) {
  const btn = variants[variant];

  return (
    <button
      className={`flex select-auto items-center gap-2 rounded-last px-6 pb-[6px] pt-1 text-sm font-medium text-txt-light duration-75 disabled:cursor-wait disabled:bg-neutral-600 xl:px-8 xl:text-base ${btn.style}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {btn.label}
      {btn.icon}
    </button>
  );
}
