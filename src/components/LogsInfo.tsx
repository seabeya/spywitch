export default function LogsInfo({ label, data }: { label: string; data: string | number }) {
  return (
    <div>
      <span className="mr-1 text-sm text-gray-400 xl:text-base">{label}:</span>
      <span className="text-sm text-gray-300 xl:text-base">{data}</span>
    </div>
  );
}
