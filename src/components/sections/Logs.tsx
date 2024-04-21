import { useEffect, useState } from 'react';

import { useSpyStore } from '@/store';
import { MessageData } from '@/types';
import Chat2Print from '@/lib/Chat2Print';
import SectionArea from '@/components/shared/SectionArea';
import LogsInfo from '@/components/LogsInfo';

type LogsProps = {
  item: string;
};

export default function Logs({ item }: LogsProps) {
  const Spy = useSpyStore.getState().spy;

  const [messageData, setMessageData] = useState<MessageData[]>([]);

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

    return () => {
      Spy.tmiClient.removeListener('message', handleMessage);
      Spy.tmiClient.removeListener('subscription', handleSubscription);
      Spy.tmiClient.removeListener('resub', handleResub);
      Spy.tmiClient.removeListener('cheer', handleCheer);
      setMessageData(() => []);
    };
  }, [item]);

  return (
    <SectionArea title="Chat Logs">
      <div className="overflow-hidden">
        <div className="flex flex-wrap justify-around gap-2 rounded-t border border-brdr px-1 pb-[6px] pt-1">
          <LogsInfo title="Target" data={item} />
          <LogsInfo title="Count" data={messageData.length} />
        </div>
      </div>
    </SectionArea>
  );
}
