import { IDBPDatabase } from 'idb';

import HandleChat, { ChatData } from '@/lib/HandleChat';

export default class Chat2Db extends HandleChat {
  users: Set<string>;

  constructor(
    private db: IDBPDatabase,
    users: string[],
  ) {
    super();
    this.users = new Set(users);
  }

  public async event({ uniqueId, user, channel, message, type }: ChatData): Promise<void> {
    if (!this.users.has(user)) return;

    this.db.add('logs', {
      uniqueId,
      user,
      channel,
      message,
      type,
      date: new Date(),
    });
  }
}
