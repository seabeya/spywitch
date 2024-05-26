type LogsInfoProps = {
  title: string;
  data: string | number;
  clickable?: boolean;
};

export default function LogsInfo({ title, data, clickable }: LogsInfoProps) {
  const output = clickable ? (
    <a href={`https://www.twitch.tv/${data}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
      {data}
    </a>
  ) : (
    data
  );

  return (
    <div>
      <span className="mr-1 text-sm text-txt-lower xl:text-base">{title}:</span>
      <span className="text-sm font-medium tabular-nums text-txt-light xl:text-base">{output}</span>
    </div>
  );
}
