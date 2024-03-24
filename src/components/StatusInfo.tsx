export default function StatusInfo({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-max flex-1 flex-row-reverse items-center justify-end gap-1 overflow-hidden px-2 pb-2 pt-2 sm:flex-col sm:items-stretch sm:justify-stretch sm:gap-0 sm:px-4 sm:pt-0">
      <span className="w-0 text-sm font-medium text-gray-300 xl:text-base" suppressHydrationWarning={true}>
        {value}
      </span>
      <span className="text-xs text-gray-400 xl:text-sm">{label}</span>
    </div>
  );
}
