type LogsInfoProps = {
  title: string;
  data: string | number;
};

export default function LogsInfo({ title, data }: LogsInfoProps) {
  return (
    <div>
      <span className="mr-1 text-sm text-txt-lower xl:text-base">{title}:</span>
      <span className="text-sm font-medium tabular-nums text-txt-light xl:text-base">{data}</span>
    </div>
  );
}
