import { IDBPDatabase } from 'idb';
import Adapter from './adapter';
import { EventData, ModeName } from '@/system/types';

class ToSave extends Adapter {
  #users = new Set<string>();

  constructor(
    private db: IDBPDatabase,
    private mode: ModeName,
    users: string[],
  ) {
    super();
    if (mode === 'users') {
      this.#users = new Set(users);
    }
  }

  public event({ uid, name, user, channel, message, extra }: EventData) {
    if (this.mode === 'users' && !this.#users.has(user)) {
      return;
    }

    this.db.add('logs', {
      uid,
      name,
      user,
      channel,
      message,
      extra,
      date: new Date(),
    });
  }
}

export default ToSave;
