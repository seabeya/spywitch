import tmi from 'tmi.js';
import { deleteDB, openDB, IDBPDatabase } from 'idb';

import { DBIndex, Mode } from '@/types';
import { dbPrefix, dbIndex } from '@/consts';

export default class Spy {
  public tmiClient = {} as tmi.Client;
  public idb = {} as IDBPDatabase;
  public idbIndex: DBIndex;

  // Setup:

  constructor(public mode: Mode) {
    this.idbIndex = dbIndex[mode];
  }

  private initTmi(channels: string[]) {
    this.tmiClient = new tmi.Client({
      channels: [...channels],
      logger: {
        info: () => {},
        warn: () => {},
        error: () => {},
      },
    });
  }

  private async initIdb() {
    const dbName = `${dbPrefix}${this.mode}`;

    await deleteDB(dbName);

    this.idb = await openDB(dbName, 1, {
      upgrade: (db) => {
        const store = db.createObjectStore('logs', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex(this.idbIndex, this.idbIndex);
      },
    });
  }

  // Actions:

  public async init(channels: string[]) {
    this.initTmi(channels);
    await this.initIdb();
  }

  public async start() {
    await this.tmiClient.connect();
  }

  public async stop() {
    await this.tmiClient.disconnect();
    this.idb.close();
    await deleteDB(`${dbPrefix}${this.mode}`);
  }
}
