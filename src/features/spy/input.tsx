import { cn } from '@/lib/utils';
import { FieldName, FieldType } from '@/system/spy';
import { useInputStore } from '@/system/store';
import IconRemove from '@/components/icons/remove';

interface InputProps {
  name: FieldName;
  type: FieldType;
  placeholder: string;
}

function Input({ name, type, placeholder }: InputProps) {
  const data = useInputStore((state) => state[name]);

  const handleRemove = (removeItem: string) => {
    const newData = data.filter((item) => item !== removeItem);
    useInputStore.setState(() => ({
      [name]: newData,
    }));
  };

  return (
    <ul className="custom-scrollbar flex max-h-28 min-h-9 flex-wrap items-center gap-1 overflow-y-auto border border-c-line p-1 text-sm focus-within:border-c-line-high">
      {data.map((value) => {
        return (
          <li
            key={value}
            className="flex items-center gap-1 border border-c-line bg-c-secondary px-1 text-c-secondary-text"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <span>{value}</span>
            <IconRemove className="size-4 shrink-0 hover:bg-c-secondary-fg" onClick={() => handleRemove(value)} />
          </li>
        );
      })}
      <li
        className={cn('w-32', {
          'w-full px-1': data.length === 0,
        })}
      >
        <input
          type="text"
          className="w-full bg-transparent text-c-secondary-text outline-none placeholder:text-c-secondary-text/75"
          placeholder={data.length === 0 ? placeholder : ''}
          disabled={type !== 'input'}
        />
      </li>
    </ul>
  );
}

export default Input;
