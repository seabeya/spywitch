import IconStart from '@/components/shared/icons/IconStart';
import IconStop from '@/components/shared/icons/IconStop';

const variants = {
  start: {
    label: 'Start',
    icon: <IconStart className="-mb-[1px] h-3 w-3 xl:mb-0" />,
    style: 'bg-purple-700 hover:bg-purple-600',
  },
  stop: {
    label: 'Stop',
    icon: <IconStop className="-mb-[1px] h-3 w-3 xl:mb-0" />,
    style: 'bg-red-700 hover:bg-red-600',
  },
};

export default function ControlBtn({
  variant,
  isDisabled,
  onClick,
}: {
  variant: 'start' | 'stop';
  isDisabled: boolean;
  onClick: () => void;
}) {
  const btn = variants[variant];

  return (
    <button
      className={`
        flex items-center gap-2 rounded-sm px-6 pb-[6px] pt-1 text-sm font-medium text-gray-200 duration-75 disabled:cursor-wait disabled:bg-gray-600 xl:px-8 xl:pb-[5px] xl:text-base
        ${btn.style}
      `}
      disabled={isDisabled}
      onClick={onClick}
    >
      {btn.label}
      {btn.icon}
    </button>
  );
}
