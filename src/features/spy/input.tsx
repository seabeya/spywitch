import { cn, isUnique } from '@/lib/utils';
import { FieldName, FieldType } from '@/system/spy';
import { useInputStore } from '@/system/store';
import IconRemove from '@/components/icons/remove';
import { useState } from 'react';
import inputDefinitions from '@/lib/input-definitions';

interface InputProps {
  name: FieldName;
  type: FieldType;
  placeholder: string;
}

function Input({ name, type, placeholder }: InputProps) {
  const [error, setError] = useState('');

  const data = useInputStore((state) => state[name]);

  const handleRemove = (removeItem: string) => {
    const newData = data.filter((item) => item !== removeItem);
    useInputStore.setState(() => ({
      [name]: newData,
    }));
  };

  const handleNewItem = (inputValue: string) => {
    const result = inputDefinitions[name].safeParse(inputValue);

    if (!result.success) {
      setError(result.error.flatten().formErrors[0]);
      return;
    }

    setError('');

    if (!isUnique(data, result.data)) {
      return;
    }

    useInputStore.setState(() => ({
      [name]: [...data, result.data],
    }));
  };

  return (
    <>
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
            enterKeyHint="enter"
            className="w-full bg-transparent text-c-secondary-text outline-none placeholder:text-c-secondary-text/75"
            placeholder={data.length === 0 ? placeholder : ''}
            disabled={type !== 'input'}
            onKeyDown={(event) => {
              if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                handleNewItem(event.currentTarget.value);
                event.currentTarget.value = '';
              }
            }}
            onBlur={() => setError('')}
          />
        </li>
      </ul>
      <div className="pl-1 text-xs text-red-500">{error}</div>
    </>
  );
}

export default Input;
