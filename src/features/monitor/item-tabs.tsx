import Button from '@/components/blocks/button';
import { cn } from '@/lib/utils';
import { useItemsStore } from '@/system/store';
import { FilterBy } from '@/system/types';

interface ItemTabsProps {
  filterBy: FilterBy;
  selectedItem: string;
  selectHandler: (item: string) => void;
}

function ItemTabs({ filterBy, selectedItem, selectHandler }: ItemTabsProps) {
  const items = useItemsStore.getState()[`${filterBy}s`];

  return (
    <div className="custom-scrollbar flex max-h-36 flex-wrap gap-2 overflow-y-auto rounded-md border border-c-line p-2">
      {items.map((item, i) => (
        <Button
          key={i}
          variant={'secondary'}
          size={'small'}
          border={'mid'}
          className={cn('rounded-sm hover:bg-c-secondary-fg', {
            'border-transparent bg-c-secondary-text text-c-secondary hover:border-transparent hover:bg-c-secondary-text':
              selectedItem === item,
          })}
          onClick={() => {
            selectHandler(item);
          }}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default ItemTabs;
