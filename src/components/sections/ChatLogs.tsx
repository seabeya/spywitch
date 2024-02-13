'use client';

import { useEffect, useState } from 'react';
import { openDB } from 'idb';

import ChatLog from '@/components/parts/ChatLog';

export type MessageData = {
  id: number;
  channel: string;
  user: string;
  message: string;
  date: string;
};

export default function ChatLogs({ user }: { user: string }) {
  const [initialMessageData, setInitialMessageData] = useState<MessageData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const db = await openDB('spywitch', 1);
        setInitialMessageData(await db.getAllFromIndex('logs', 'user', user));
      } catch (error) {
        console.log('Something went wrong while fetching data from IndexedDB. Please refresh the page and try again.');
      }
    })();
  }, [user]);

  return (
    <div>
      <div className="pb-2 text-sm text-gray-300 xl:text-base">
        Sender: <span className="font-medium text-gray-200 underline">{user.substring(0, 25)}</span>
        <i>({initialMessageData.length})</i>
      </div>
      <ul className="scrollbar flex max-h-[512px] flex-col gap-2 overflow-auto rounded-sm border border-c_border1 bg-c_body p-1">
        {initialMessageData.map((data) => (
          <ChatLog key={data.id} data={data} />
        ))}
      </ul>
    </div>
  );
}
