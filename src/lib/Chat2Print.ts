import { Dispatch, SetStateAction } from 'react';

import HandleChat from '@/lib/HandleChat';

import { ChatData, MessageData } from '@/types';

export default class Chat2Log extends HandleChat {
  constructor(
    private writer: Dispatch<SetStateAction<MessageData[]>>,
    private item: string,
    private filterBy: 'user' | 'channel',
  ) {
    super();
  }

  public event({ uniqueId, event, user, channel, info, message }: ChatData): void {
    if (this.filterBy === 'user') {
      if (this.item !== user) return;
    } else {
      if (this.item !== channel) return;
    }

    this.writer((prev) => [
      ...prev,
      {
        uniqueId,
        event,
        user,
        channel,
        info,
        message,
        date: new Date(),
      },
    ]);
  }
}
