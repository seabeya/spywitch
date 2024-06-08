import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import clsx from 'clsx';

import { useItemsStore, useSpyStore } from '@/store';
import { MessageData } from '@/types';
import { eventOptions } from '@/consts';
import Chat2Print from '@/lib/Chat2Print';
import SectionArea from '@/components/shared/SectionArea';
import LogsInfo from '@/components/LogsInfo';
import Log from '@/components/Log';

type LogsProps = {
  target: string;
};

export default function Logs({ target }: LogsProps) {
  const Spy = useSpyStore.getState().spy;
  const Events = Spy.mode === 'users' ? eventOptions : useItemsStore.getState().events;

  const [messageData, setMessageData] = useState<MessageData[]>([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get existing data from indexedDB:
    (async () => {
      try {
        setMessageData(await Spy.idb.getAllFromIndex('logs', Spy.idbIndex, target));
      } catch (_) {
        console.log('Something went wrong while fetching data from IndexedDB. Please refresh the page and try again.');
      }
    })();

    // Listening to new messages:
    const handle = new Chat2Print(setMessageData, target, Spy.idbIndex);

    const eventHandlerMap = Spy.setListeners(handle, Events);

    // 200ms delay before showing the data:
    setIsVisible(false);
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => {
      Spy.unsetListeners(eventHandlerMap);
      setMessageData(() => []);
      clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

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
          <LogsInfo title="Target" data={target} clickable />
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
