interface StatusItemProps {
  label: string;
  data: string;
}

function StatusItem({ label, data }: StatusItemProps) {
  return (
    <div className="flex flex-col gap-1 overflow-hidden p-s-gap pt-0 text-sm *:whitespace-nowrap">
      <span className="tabular-nums text-c-secondary-text">{data}</span>
      <span className="text-c-secondary-text/75">{label}</span>
    </div>
  );
}

export default StatusItem;
