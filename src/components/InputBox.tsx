import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { getUniqueItems, isValidInput } from '@/lib/utils';

type InputBoxProps = {
  id: string;
  placeholder: string;
  items: string[];
  isLocked: boolean;
  getItems: (items: string[]) => void;
};

export default function InputBox({ id, placeholder, items, isLocked, getItems }: InputBoxProps) {
  const [inputItems, setInputItems] = useState(items);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getItems(inputItems);
  }, [inputItems]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return;
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLocked) return;

    if (event.key === 'Backspace' && inputValue.length === 0 && inputItems.length > 0) {
      setInputItems((prev) => {
        const lastItem = prev.pop();
        setInputValue(lastItem || '');
        return [...prev];
      });
      event.preventDefault();
    }

    if (event.key === ' ' || event.key === 'Enter') {
      if (isValidInput(inputValue)) {
        const uniqueItems = getUniqueItems([...inputItems, inputValue.toLowerCase()]);
        if (uniqueItems.length !== inputItems.length) {
          setInputItems(uniqueItems);
        }
      }
      setInputValue('');
      event.preventDefault();
    }
  };

  const handleItemClick = (itemToRemove: string) => {
    if (isLocked) return;
    setInputItems((prev) => prev.filter((item) => item !== itemToRemove));
  };

  return (
    <ul
      className={clsx(
        'custom-scrollbar focus-within:border-brdr-active relative flex max-h-32 min-h-[42px] cursor-text flex-wrap items-center gap-1 overflow-y-auto overflow-x-hidden break-all rounded border border-brdr bg-neutral-900 px-3 py-2 text-sm text-txt-light xl:min-h-[46px] xl:text-base',
        {
          '!cursor-default *:cursor-not-allowed': isLocked,
        },
      )}
    >
      {/* Placeholder: */}
      {inputItems.length === 0 && inputValue.length === 0 && (
        <li className="text-txt-last absolute min-w-max">{placeholder}</li>
      )}
      {/* Items: */}
      {inputItems.map((item, i) => (
        <li
          key={i}
          className="rounded-last cursor-pointer bg-neutral-700 px-2 pb-[3px] pt-[1px] hover:bg-red-800"
          onClick={() => handleItemClick(item)}
        >
          {item}
        </li>
      ))}
      {/* Actual input element: */}
      <li>
        <input
          type="text"
          id={id}
          className="bg-transparent outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={isLocked}
        />
      </li>
    </ul>
  );
}
