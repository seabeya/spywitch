type StatusInfoProps = {
  label: string;
  value: string;
};

export default function StatusInfo({ label, value }: StatusInfoProps) {
  return (
    <div className="flex flex-row-reverse items-center justify-end gap-1 px-2 pb-2 pt-[7px] sm:flex-col sm:items-start sm:gap-0 sm:px-4 sm:pt-0">
      <span className="text-sm font-medium tabular-nums text-txt-low xl:text-base">{value}</span>
      <span className="min-w-max text-xs capitalize text-txt-lower xl:text-sm">{label}</span>
    </div>
  );
}
