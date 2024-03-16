import { Dispatch, SetStateAction } from 'react';

import HandleChat, { ChatData } from '@/lib/HandleChat';

import { MessageData } from '@/components/sections/ChatLogs';

export default class Chat2Log extends HandleChat {
  constructor(
    private writer: Dispatch<SetStateAction<MessageData[]>>,
    private user: string,
  ) {
    super();
  }

  public event({ uniqueId, user, channel, message, type }: ChatData): void {
    if (this.user !== user) return;

    this.writer((prev) => [
      ...prev,
      {
        uniqueId,
        user,
        channel,
        message,
        type,
        date: new Date(),
      },
    ]);
  }
}
