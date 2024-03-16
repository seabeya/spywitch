import { MessageData } from '@/components/sections/ChatLogs';

export default function ChatLog({ data }: { data: MessageData }) {
  const { channel, message, type, date } = data;

  const time = new Date(date).toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="mb-2 inline-block w-full break-words border-l-2 border-gray-600 pl-2 text-xs hover:border-gray-400 hover:bg-gray-800 sm:text-sm xl:text-base">
      <div className="inline-flex gap-1 text-gray-400">
        <span className="group">
          {time.substring(0, 5)}
          <span className="hidden group-hover:inline-block">{time.substring(5, 8)}</span>
        </span>
        <span className="font-medium text-purple-500">{channel}</span>
        <span className="font-medium">/</span>
      </div>
      <p className="ml-1 inline text-gray-200">
        {type !== null && <span className="mr-1 rounded-sm bg-yellow-400 px-1 text-black">{type}</span>}
        {message}
      </p>
    </div>
  );
}
