export default function Input({ placeholder }: { placeholder: string }) {
  return (
    <textarea
      className="resize-none rounded-sm border border-c_border2 bg-c_body px-2 py-1 text-sm text-gray-200 outline-none placeholder:text-slate-500 focus:border-gray-600 xl:text-base"
      rows={2}
      placeholder={placeholder}
    ></textarea>
  );
}
