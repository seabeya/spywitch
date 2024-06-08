import tmi from 'tmi.js';
import { deleteDB, openDB, IDBPDatabase } from 'idb';

import { DBIndex, Event, Mode } from '@/types';
import { dbPrefix, dbIndex } from '@/consts';

import Chat2Db from '@/lib/Chat2Db';
import Chat2Log from '@/lib/Chat2Print';

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

  public setListeners(handler: Chat2Db | Chat2Log, events: readonly Event[]) {
    for (const event of events) {
      switch (event) {
        case 'chat':
          this.tmiClient.on('message', handler.onMessage.bind(handler));
          break;
        case 'sub':
          this.tmiClient.on('subscription', handler.onSubscription.bind(handler));
          break;
        case 'resub':
          this.tmiClient.on('resub', handler.onResub.bind(handler));
          break;
        case 'cheer':
          this.tmiClient.on('cheer', handler.onCheer.bind(handler));
          break;
        case 'subgift':
          this.tmiClient.on('subgift', handler.onSubgift.bind(handler));
          this.tmiClient.on('submysterygift', handler.onSubmysterygift.bind(handler));
          break;
      }
    }
  }

  public async start() {
    await this.tmiClient.connect();
  }

  public async stop() {
    this.tmiClient.removeAllListeners();
    await this.tmiClient.disconnect();
    this.idb.close();
    await deleteDB(`${dbPrefix}${this.mode}`);
  }
}
