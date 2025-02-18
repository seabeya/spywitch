import { Dispatch, SetStateAction } from 'react';
import Adapter from './adapter';
import { EventData, FilterBy, Log } from '@/system/types';

class ToShow extends Adapter {
  constructor(
    private writer: Dispatch<SetStateAction<Log[]>>,
    private targetItem: string,
    private filterBy: FilterBy,
  ) {
    super();
  }

  public event({ uid, name, user, channel, message, extra }: EventData) {
    if (this.filterBy === 'user') {
      if (this.targetItem !== user) return;
    } else {
      if (this.targetItem !== channel) return;
    }

    this.writer((prev) => [
      ...prev,
      {
        uid,
        name,
        user,
        channel,
        message,
        extra,
        date: new Date(),
      },
    ]);
  }
}

export default ToShow;
