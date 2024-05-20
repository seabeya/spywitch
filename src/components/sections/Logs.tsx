import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import clsx from 'clsx';

import { useSpyStore } from '@/store';
import { MessageData } from '@/types';
import Chat2Print from '@/lib/Chat2Print';
import SectionArea from '@/components/shared/SectionArea';
import LogsInfo from '@/components/LogsInfo';
import Log from '@/components/Log';

type LogsProps = {
  item: string;
};

export default function Logs({ item }: LogsProps) {
  const Spy = useSpyStore.getState().spy;

  const [messageData, setMessageData] = useState<MessageData[]>([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get existing data from indexedDB:
    (async () => {
      try {
        setMessageData(await Spy.idb.getAllFromIndex('logs', Spy.idbIndex, item));
      } catch (_) {
        console.log('Something went wrong while fetching data from IndexedDB. Please refresh the page and try again.');
      }
    })();

    // Listening to new messages:
    const handle = new Chat2Print(setMessageData, item, Spy.idbIndex);

    const handleMessage = handle.onMessage.bind(handle);
    const handleSubscription = handle.onSubscription.bind(handle);
    const handleResub = handle.onResub.bind(handle);
    const handleCheer = handle.onCheer.bind(handle);

    if (Spy.mode === 'Users') {
      Spy.tmiClient.on('message', handleMessage);
    }
    Spy.tmiClient.on('subscription', handleSubscription);
    Spy.tmiClient.on('resub', handleResub);
    Spy.tmiClient.on('cheer', handleCheer);

    // 200ms delay before showing the data:
    setIsVisible(false);
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => {
      Spy.tmiClient.removeListener('message', handleMessage);
      Spy.tmiClient.removeListener('subscription', handleSubscription);
      Spy.tmiClient.removeListener('resub', handleResub);
      Spy.tmiClient.removeListener('cheer', handleCheer);
      setMessageData(() => []);
      clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <SectionArea title="Chat Logs">
      <div className="overflow-hidden">
        <div className="relative flex flex-wrap justify-around gap-2 rounded-t border border-b-0 border-brdr px-1 pb-[6px] pt-1">
          <div
            className={clsx(
              'absolute inset-0 z-10 flex items-center justify-around bg-neutral-950 *:h-2 *:w-12 *:bg-neutral-800',
              {
                hidden: isVisible,
              },
            )}
          >
            <i></i>
            <i></i>
          </div>
          <LogsInfo title="Target" data={item} />
          <LogsInfo title="Count" data={messageData.length} />
        </div>
        <div className="relative rounded-b border border-brdr bg-neutral-900 p-1">
          <div
            className={clsx(`absolute inset-0 z-10 bg-neutral-900`, {
              hidden: isVisible,
            })}
          ></div>
          <Virtuoso
            style={{ height: '512px' }}
            className="custom-scrollbar"
            data={messageData}
            followOutput={true}
            itemContent={(_, data) => <Log data={data} />}
          />
        </div>
      </div>
    </SectionArea>
  );
}
