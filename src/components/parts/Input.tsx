import { useState } from 'react';

import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { atom_isLoading, atom_status } from '@/atoms';

import { getUniqueItems, isValidInput } from '@/lib/utils';

type InputProps = {
  id: string;
  placeholder: string;
  itemsAtom: PrimitiveAtom<string[]>;
};

export default function Input({ id, placeholder, itemsAtom }: InputProps) {
  const isLoading = useAtomValue(atom_isLoading);
  const status = useAtomValue(atom_status);

  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useAtom(itemsAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading || status.active) {
      return;
    }

    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoading || status.active) {
      return;
    }

    if (event.key === 'Backspace' && inputValue.length === 0) {
      const lastItem = items.at(-1);
      setItems((prev) => [...prev.slice(0, -1)]);
      setInputValue((lastItem || '') + ' ');
      return;
    }

    if (event.key !== ' ' && event.key !== 'Enter') {
      return;
    }

    if (isValidInput(inputValue)) {
      setItems((prev) => getUniqueItems([...prev, inputValue.toLowerCase()]));
    }

    setInputValue('');

    event.preventDefault();
  };

  const handleItemRemove = (itemToRemove: string) => {
    if (isLoading || status.active) {
      return;
    }

    setItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
  };

  return (
    <ul className="scrollbar flex max-h-32 cursor-text flex-wrap items-center gap-1 overflow-y-auto overflow-x-hidden break-all rounded-sm border border-c_border2 bg-c_body px-3 py-2 text-sm text-gray-200 focus-within:border-gray-600 xl:text-base">
      {inputValue.length === 0 && items.length === 0 && (
        <li className="absolute">
          <span className="text-slate-500">{placeholder}</span>
        </li>
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
        />
      </li>
    </ul>
  );
}
