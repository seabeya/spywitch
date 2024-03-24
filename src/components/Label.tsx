export default function Label({
  children,
  title,
  htmlFor,
  desc,
}: {
  children: React.ReactNode;
  title: string;
  htmlFor: string;
  desc?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-sm text-gray-300 xl:text-base">
        {title}
        {desc ? <i className="ml-1 text-xs text-gray-400 xl:text-sm">({desc})</i> : ''}
      </span>
      {children}
    </label>
  );
}
