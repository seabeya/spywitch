interface StatusInfoProps {
  label: string;
  data: string | number;
}

function StatusInfo({ label, data }: StatusInfoProps) {
  return (
    <div className="flex flex-row-reverse justify-end gap-1 overflow-hidden p-2 text-sm *:whitespace-nowrap sm:flex-col sm:p-s-gap sm:pt-0">
      <span className="tabular-nums text-c-secondary-text">{data}</span>
      <span className="truncate font-light capitalize text-c-secondary-text/75">{label}</span>
    </div>
  );
}

export default StatusInfo;
