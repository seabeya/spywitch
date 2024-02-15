'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { atom_idbConn, atom_tmiConn } from '@/atoms';
import { ChatUserstate } from 'tmi.js';

import { Virtuoso } from 'react-virtuoso';

import ChatLog from '@/components/parts/ChatLog';

export type MessageData = {
  uniqueId: number;
  channel: string;
  user: string;
  message: string;
  date: string;
};

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
    const handleNewMessage = async (channel: string, tags: ChatUserstate, message: string) => {
      if (tags['username'] !== user) return;

      setMessageData(
        (prev) =>
          [
            ...prev,
            {
              uniqueId: tags['id'],
              user: tags['username'],
              channel: channel.substring(1),
              message,
              date: new Date(),
            },
          ] as MessageData[],
      );
    };

    tmiConn.on('message', handleNewMessage);

    return () => {
      tmiConn.removeListener('message', handleNewMessage);
      setMessageData(() => []);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className="pb-2 text-sm text-gray-300 xl:text-base">
        Sender: <span className="font-medium text-gray-200 underline">{user.substring(0, 25)}</span>
        <i>({messageData.length})</i>
      </div>
      <div className="rounded-sm border border-c_border1 bg-c_body p-1">
        <Virtuoso
          style={{ height: '512px' }}
          className="scrollbar"
          data={messageData}
          itemContent={(_, data) => <ChatLog key={data.uniqueId} data={data} />}
          followOutput={true}
        />
      </div>
    </div>
  );
}
