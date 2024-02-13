type InputProps = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <textarea
      className="scrollbar resize-none rounded-sm border border-c_border2 bg-c_body px-3 py-2 text-sm text-gray-200 outline-none placeholder:text-slate-500 focus:border-gray-600 xl:text-base"
      rows={2}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></textarea>
  );
}
