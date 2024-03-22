'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { atom_idbConn, atom_tmiConn } from '@/atoms';

import { Virtuoso } from 'react-virtuoso';

import Chat2Log from '@/lib/Chat2Log';

import SectionArea from '@/components/layout/SectionArea';

import ChatLog from '@/components/ChatLog';
import LogsInfo from '@/components/LogsInfo';

import { MessageData } from '@/types';

export default function ChatLogs({ user }: { user: string }) {
  const idbConn = useAtomValue(atom_idbConn);
  const tmiConn = useAtomValue(atom_tmiConn);
  const [messageData, setMessageData] = useState<MessageData[]>([]);

  // Getting data from IndexedDB:
  useEffect(() => {
    (async () => {
      try {
        setMessageData(await idbConn.getAllFromIndex('logs', 'user', user));
      } catch (_) {
        console.log('Something went wrong while fetching data from IndexedDB. Please refresh the page and try again.');
      }
    })();

    // Listening to new messages:
    const handle = new Chat2Log(setMessageData, user);

    const handleMessage = handle.onMessage.bind(handle);
    const handleSubscription = handle.onSubscription.bind(handle);
    const handleResub = handle.onResub.bind(handle);
    const handleCheer = handle.onCheer.bind(handle);

    tmiConn.on('message', handleMessage);
    tmiConn.on('subscription', handleSubscription);
    tmiConn.on('resub', handleResub);
    tmiConn.on('cheer', handleCheer);

    return () => {
      tmiConn.removeListener('message', handleMessage);
      tmiConn.removeListener('subscription', handleSubscription);
      tmiConn.removeListener('resub', handleResub);
      tmiConn.removeListener('cheer', handleCheer);
      setMessageData(() => []);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SectionArea title="Chat Logs">
      <div className="overflow-hidden">
        <div className="flex flex-wrap justify-around gap-2 rounded-t-sm border border-b-0 border-c_border1 px-1 pb-2 pt-1">
          <LogsInfo label="Sender" data={user.substring(0, 25)} />
          <LogsInfo label="Count" data={messageData.length} />
        </div>
        <div className="rounded-b-sm border border-c_border1 bg-c_body p-1">
          <Virtuoso
            style={{ height: '512px' }}
            className="scrollbar"
            data={messageData}
            itemContent={(_, data) => <ChatLog key={data.uniqueId} data={data} />}
            followOutput={true}
          />
        </div>
      </div>
    </SectionArea>
  );
}
