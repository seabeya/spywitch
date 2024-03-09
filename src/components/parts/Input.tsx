import { useState } from 'react';

import { PrimitiveAtom, useAtom } from 'jotai';

import { getUniqueItems, isValidInput } from '@/lib/utils';

type InputProps = {
  id: string;
  placeholder: string;
  itemsAtom: PrimitiveAtom<string[]>;
};

export default function Input({ id, placeholder, itemsAtom }: InputProps) {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useAtom(itemsAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== ' ' && event.key !== 'Enter') {
      return;
    }

    if (isValidInput(inputValue)) {
      setItems((prev) => getUniqueItems([...prev, inputValue.toLowerCase()]));
      setInputValue('');
    }

    event.preventDefault();
  };

  return (
    <ul className="scrollbar flex max-h-32 cursor-text flex-wrap gap-3 overflow-y-auto overflow-x-hidden break-all rounded-sm border border-c_border2 bg-c_body px-3 py-2 text-sm text-gray-200 focus-within:border-gray-600 xl:text-base">
      {inputValue.length === 0 && items.length === 0 && (
        <li className="absolute">
          <span className="text-slate-500">{placeholder}</span>
        </li>
      )}
      {items.map((item) => (
        <li key={item}>{item}</li>
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
