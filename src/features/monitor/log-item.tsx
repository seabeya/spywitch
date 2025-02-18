import { FilterBy, Log } from '@/system/types';

interface LogItemProps {
  data: Log;
  filterBy: FilterBy;
}
function LogItem({ data, filterBy }: LogItemProps) {
  const { date, name, user, channel, message, extra } = data;

  const time = new Date(date).toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="my-1 inline-block w-full break-words border-l-2 border-c-line-high px-2 text-sm hover:border-c-primary hover:bg-c-secondary">
      <div className="mr-1 inline-flex text-c-secondary-text/75">
        <span className="group mr-1">
          {time.substring(0, 5)}
          <span className="hidden group-hover:inline-block">{time.substring(5, 8)}</span>
        </span>
        {filterBy === 'user' ? (
          <>
            <a
              href={`https://www.twitch.tv/${channel}`}
              target="_blank"
              className="font-semibold text-purple-500 hover:underline"
            >
              {channel}
            </a>
            <span className="ml-1">{'<--'}</span>
          </>
        ) : (
          <>
            <a
              href={`https://www.twitch.tv/${user}`}
              target="_blank"
              className="font-semibold text-purple-500 hover:underline"
            >
              {user}
            </a>
            <span>:</span>
          </>
        )}
      </div>
      <p className="inline text-c-secondary-text">
        {name !== 'chat' && <span className="mr-1 rounded-sm bg-yellow-400 px-1 font-medium text-black">{extra}</span>}
        {message}
      </p>
    </div>
  );
}

export default LogItem;
