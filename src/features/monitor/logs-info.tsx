interface LogsInfoProps {
  target: string;
  count: number;
}

function LogsInfo({ target, count }: LogsInfoProps) {
  return (
    <div className="flex justify-around text-sm">
      <p className="flex gap-1">
        <span className="text-c-secondary-text/75">Target:</span>
        <a
          href={`https://www.twitch.tv/${target}`}
          target="_blank"
          className="font-semibold text-c-secondary-text hover:underline"
        >
          {target}
        </a>
      </p>
      <p className="flex gap-1">
        <span className="text-c-secondary-text/75">Count:</span>
        <span className="font-semibold tabular-nums text-c-secondary-text">{count}</span>
      </p>
    </div>
  );
}

export default LogsInfo;
