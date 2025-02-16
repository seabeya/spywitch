import { cn } from '@/lib/utils';
import { useIsActiveStore } from '@/system/store';

interface SelectListProps {
  list: readonly string[];
  data: string[];
  newItemHandler: (item: string) => void;
}

function SelectList({ list, data, newItemHandler }: SelectListProps) {
  const isActive = useIsActiveStore();

  return (
    <ul className="flex flex-wrap justify-center gap-1 pb-1">
      {list.map((item) => {
        const isDisabled = data.includes(item) || isActive;
        return (
          <li
            key={item}
            className={cn(
              'cursor-pointer rounded-md border border-c-line bg-c-secondary px-s-gap py-1 text-sm text-c-secondary-text hover:border-c-line-high',
              {
                'pointer-events-none border-c-line-low bg-c-secondary/25 text-c-secondary-text/75': isDisabled,
              },
            )}
            onClick={() => {
              if (isDisabled) return;
              newItemHandler(item);
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default SelectList;
