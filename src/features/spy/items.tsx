import IconRemove from '@/components/icons/remove';
import { cn } from '@/lib/utils';
import { useInputStore, useIsActiveStore } from '@/system/store';
import { FieldName } from '@/system/types';

interface ItemsProps {
  name: FieldName;
}

function Items({ name }: ItemsProps) {
  const isActive = useIsActiveStore();

  const data = useInputStore((state) => state[name]);

  const handleRemove = (removeItem: string) => {
    if (isActive) return;

    const newData = data.filter((item) => item !== removeItem);
    useInputStore.setState(() => ({
      [name]: newData,
    }));
  };

  return data.map((value) => {
    return (
      <li
        key={value}
        className="flex items-center gap-1 border border-c-line bg-c-secondary px-1 text-c-secondary-text"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <span>{value}</span>
        <IconRemove
          className={cn('size-4 shrink-0 cursor-pointer text-c-secondary-text/75 hover:bg-c-secondary-fg', {
            'pointer-events-none text-c-secondary-text/55': isActive,
          })}
          onClick={() => handleRemove(value)}
        />
      </li>
    );
  });
}

export default Items;
