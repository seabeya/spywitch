import { cn, isUnique } from '@/lib/utils';
import { useIsActiveStore, useItemsStore } from '@/system/store';
import { useState } from 'react';
import inputDefinitions from '@/lib/input-definitions';
import { FieldName, FieldType } from '@/system/types';
import { EVENTS } from '@/system/spy';

interface FieldProps {
  name: FieldName;
  type: FieldType;
  placeholder: string;
  children: React.ReactNode;
}

function Field({ name, type, placeholder, children }: FieldProps) {
  const [error, setError] = useState('');

  const isActive = useIsActiveStore();

  const data = useItemsStore((state) => state[name]);

  const handleNewItem = (inputValue: string) => {
    if (isActive) return;

    const result = inputDefinitions[name].safeParse(inputValue);

    if (!result.success) {
      setError(result.error.flatten().formErrors[0]);
      return;
    }

    setError('');

    if (!isUnique(data, result.data)) {
      setError('Must be unique');
      return;
    }

    useItemsStore.setState(() => ({
      [name]: [...data, result.data],
    }));
  };

  return (
    <>
      {type === 'select' && (
        <ul className="flex flex-wrap justify-center gap-1 pb-1">
          {EVENTS.map((event) => {
            const isDisabled = data.includes(event) || isActive;
            return (
              <li
                key={event}
                className={cn(
                  'cursor-pointer rounded-md border border-c-line bg-c-secondary px-s-gap py-1 text-sm text-c-secondary-text hover:border-c-line-high',
                  {
                    'pointer-events-none border-c-line-low bg-c-secondary/25 text-c-secondary-text/75': isDisabled,
                  },
                )}
                onClick={() => {
                  if (isDisabled) return;
                  handleNewItem(event);
                }}
              >
                {event}
              </li>
            );
          })}
        </ul>
      )}
      <ul className="custom-scrollbar flex max-h-28 min-h-10 flex-wrap items-center gap-1 overflow-y-auto rounded-sm border border-c-line p-2 text-sm focus-within:border-c-line-high">
        {children}
        <li className={cn('w-32', { 'w-full px-1': data.length === 0 })}>
          <input
            type="text"
            enterKeyHint="enter"
            className="w-full bg-transparent text-c-secondary-text outline-none placeholder:text-c-secondary-text/75"
            placeholder={data.length === 0 ? placeholder : ''}
            disabled={type !== 'input' || isActive}
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
      {error.length > 0 && <div className="pl-1 text-xs text-red-500">{error}.</div>}
    </>
  );
}

export default Field;
