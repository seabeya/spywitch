import { useItemsStore, useModeStore } from '@/store';
import SectionArea from '@/components/shared/SectionArea';
import ItemTab from '@/components/ItemTab';
import { dbIndex } from '@/consts';

type ItemTabsProps = {
  activeTab: string;
  handleTabClick: (tab: string) => void;
};

export default function ItemTabs({ activeTab, handleTabClick }: ItemTabsProps) {
  const Mode = useModeStore.getState().mode;

  const sectionTitle = `${dbIndex[Mode][0].toUpperCase() + dbIndex[Mode].slice(1)}s`;

  let items: string[] = [];

  if (Mode === 'users') {
    items = useItemsStore.getState().users;
  } else if (Mode === 'events') {
    items = useItemsStore.getState().channels;
  }

  return (
    <SectionArea title={sectionTitle}>
      <div className="custom-scrollbar flex max-h-32 flex-wrap gap-2 overflow-y-auto overflow-x-hidden rounded border border-brdr bg-neutral-900 p-1">
        {items.map((item) => {
          return <ItemTab key={item} item={item} activeTab={activeTab} handleTabClick={handleTabClick} />;
        })}
      </div>
    </SectionArea>
  );
}
