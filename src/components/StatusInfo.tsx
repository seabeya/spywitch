type StatusInfoProps = {
  value: string;
  label: string;
};

export default function StatusInfo({ value, label }: StatusInfoProps) {
  return (
    <div className="flex flex-row-reverse items-center justify-end gap-1 px-2 pb-2 pt-[7px] sm:flex-col sm:items-start sm:gap-0 sm:px-4 sm:pt-0">
      <span className="text-sm font-medium tabular-nums text-txt-low xl:text-base">{value}</span>
      <span className="text-txt-lower min-w-max text-xs xl:text-sm">{label}</span>
    </div>
  );
}
