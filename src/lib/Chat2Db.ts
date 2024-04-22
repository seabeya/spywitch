import { IDBPDatabase } from 'idb';

import HandleChat from '@/lib/HandleChat';

import { ChatData } from '@/types';

export default class Chat2Db extends HandleChat {
  private users: Set<string> | undefined;

  constructor(
    private db: IDBPDatabase,
    users?: string[],
  ) {
    super();
    if (users) this.users = new Set(users);
  }

  public async event({ uniqueId, event, user, channel, info, message }: ChatData): Promise<void> {
    if (this.users && !this.users.has(user)) return;

    this.db.add('logs', {
      uniqueId,
      event,
      user,
      channel,
      info,
      message,
      date: new Date(),
    });
  }
}
