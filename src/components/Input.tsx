import { useState } from 'react';

import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { atom_started } from '@/atoms';

import { getUniqueItems, isValidInput } from '@/lib/utils';

type InputProps = {
  id: string;
  placeholder: string;
  itemsAtom: PrimitiveAtom<string[]>;
};

export default function Input({ id, placeholder, itemsAtom }: InputProps) {
  const started = useAtomValue(atom_started);

  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useAtom(itemsAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue.length === 0) {
      setItems((prev) => {
        const lastItem = prev.pop();
        setInputValue(lastItem || '');
        return [...prev];
      });
      event.preventDefault();
    }

    if (event.key === ' ' || event.key === 'Enter') {
      if (isValidInput(inputValue)) {
        setItems((prev) => getUniqueItems([...prev, inputValue.toLowerCase()]));
      }
      setInputValue('');
      event.preventDefault();
    }
  };

  const handleItemRemove = (itemToRemove: string) => {
    if (started) {
      return;
    }

    setItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
  };

  return (
    <ul
      className={`scrollbar relative flex max-h-32 cursor-text flex-wrap items-center gap-1 overflow-y-auto overflow-x-hidden break-all rounded-sm border border-c_border2 bg-c_body px-3 py-2 text-sm text-gray-200 focus-within:border-gray-600 xl:text-base
      ${started && '!cursor-default *:cursor-not-allowed'}`}
    >
      {inputValue.length === 0 && items.length === 0 && (
        <li className="absolute min-w-max text-slate-500">{placeholder}</li>
      )}
      {items.map((item) => (
        <li
          key={item}
          className="cursor-pointer rounded-sm bg-gray-700 px-2 pb-[2px] pt-[1px] hover:bg-red-800"
          onClick={() => handleItemRemove(item)}
        >
          {item}
        </li>
      ))}
      <li>
        <input
          id={id}
          type="text"
          className="bg-transparent outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={started}
        />
      </li>
    </ul>
  );
}
