import { useModeStore } from '@/store';
import { MessageData } from '@/types';

export default function Log({ data }: { data: MessageData }) {
  const { date, event, user, channel, info, message } = data;

  const time = new Date(date).toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const Mode = useModeStore.getState().mode;

  return (
    <div className="mb-1 inline-block w-full break-words border-l-2 border-brdr-light pl-2 text-sm hover:border-green-500 hover:bg-neutral-800 xl:mb-2 xl:text-base">
      <div className="inline-flex gap-1 text-txt-lower">
        <span className="group">
          {time.substring(0, 5)}
          <span className="hidden group-hover:inline-block">{time.substring(5, 8)}</span>
        </span>
        {Mode === 'users' ? (
          <>
            <span className="font-bold text-purple-500">{channel}</span>
            <span>{'<--'}</span>
          </>
        ) : (
          <span className="font-bold text-purple-500">
            {user}
            <span className="font-normal text-txt-lower">:</span>
          </span>
        )}
      </div>
      <p className="ml-1 inline text-txt-light">
        {event !== 'chat' && (
          <span className="mr-1 rounded-middle bg-yellow-400 px-1 font-medium text-black">{info}</span>
        )}
        {message}
      </p>
    </div>
  );
}
