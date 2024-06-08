import tmi, { Events } from 'tmi.js';
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
    const eventHandlerMap = new Map<keyof Events, any>();

    for (const event of events) {
      switch (event) {
        case 'chat':
          eventHandlerMap.set('message', handler.onMessage.bind(handler));
          this.tmiClient.on('message', eventHandlerMap.get('message'));
          break;
        case 'sub':
          eventHandlerMap.set('subscription', handler.onSubscription.bind(handler));
          this.tmiClient.on('subscription', eventHandlerMap.get('subscription'));
          break;
        case 'resub':
          eventHandlerMap.set('resub', handler.onResub.bind(handler));
          this.tmiClient.on('resub', eventHandlerMap.get('resub'));
          break;
        case 'cheer':
          eventHandlerMap.set('cheer', handler.onCheer.bind(handler));
          this.tmiClient.on('cheer', eventHandlerMap.get('cheer'));
          break;
        case 'subgift':
          eventHandlerMap.set('subgift', handler.onSubgift.bind(handler));
          this.tmiClient.on('subgift', eventHandlerMap.get('subgift'));
          eventHandlerMap.set('submysterygift', handler.onSubmysterygift.bind(handler));
          this.tmiClient.on('submysterygift', eventHandlerMap.get('submysterygift'));
          break;
      }
    }
    return eventHandlerMap;
  }

  public async start() {
    await this.tmiClient.connect();
  }

  public unsetListeners(eventMap: Map<keyof Events, () => void>) {
    eventMap.forEach((value, key) => {
      this.tmiClient.removeListener(key, value);
    });
  }

  public async stop() {
    this.tmiClient.removeAllListeners();
    await this.tmiClient.disconnect();
    this.idb.close();
    await deleteDB(`${dbPrefix}${this.mode}`);
  }
}
