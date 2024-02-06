export default function Label({ children, title, desc }: { children: React.ReactNode; title: string; desc?: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-gray-400 xl:text-base">
        {title}
        {desc ? <i className="ml-1 text-xs xl:text-sm">({desc})</i> : ''}
      </span>
      {children}
    </label>
  );
}
