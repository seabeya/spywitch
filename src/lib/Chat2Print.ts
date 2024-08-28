import { Dispatch, SetStateAction } from 'react';

import HandleChat from '@/lib/HandleChat';

import { ChatData, DBIndex, MessageData } from '@/types';

export default class Chat2Log extends HandleChat {
  constructor(
    private writer: Dispatch<SetStateAction<MessageData[]>>,
    private item: string,
    private filterBy: DBIndex,
  ) {
    super();
  }

  public event({ uniqueId, event, fromUser, channel, info, message }: ChatData): void {
    if (this.filterBy === 'fromUser') {
      if (this.item !== fromUser) return;
    } else {
      if (this.item !== channel) return;
    }

    this.writer((prev) => [
      ...prev,
      {
        uniqueId,
        event,
        fromUser,
        channel,
        info,
        message,
        date: new Date(),
      },
    ]);
  }
}
