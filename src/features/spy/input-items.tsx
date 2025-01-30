import IconRemove from '@/components/icons/remove';
import { FieldName } from '@/system/spy';
import { useInputStore } from '@/system/store';

interface InputItemsProps {
  name: FieldName;
}

function InputItems({ name }: InputItemsProps) {
  const data = useInputStore((state) => state[name]);

  const handleRemove = (removeItem: string) => {
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
        <IconRemove className="size-4 shrink-0 hover:bg-c-secondary-fg" onClick={() => handleRemove(value)} />
      </li>
    );
  });
}

export default InputItems;
