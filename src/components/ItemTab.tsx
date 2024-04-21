import clsx from 'clsx';

type ItemTabProps = {
  item: string;
  activeTab: string;
  handleTabClick: (tab: string) => void;
};

export default function ItemTab({ item, activeTab, handleTabClick }: ItemTabProps) {
  const isActive = item === activeTab;

  return (
    <button
      onClick={() => handleTabClick(item)}
      className={clsx(
        'rounded-last border-b-2 border-brdr-light bg-neutral-800 px-2 py-[2px] text-sm text-txt-low hover:bg-neutral-700 hover:text-txt-light xl:text-base',
        {
          '!border-green-500 !bg-neutral-700 !text-txt-light': isActive,
        },
      )}
    >
      {item}
    </button>
  );
}
