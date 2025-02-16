import tmi, { Events } from 'tmi.js';
import { openDB, IDBPDatabase } from 'idb';
import ToSave from './to-save';
import { MODES } from '@/system/consts';
import { EventType, FilterBy, ModeName } from '@/system/types';
import { v7 as uuidv7 } from 'uuid';

class Spy {
  #tmiClient = {} as tmi.Client;
  idb = {} as IDBPDatabase;
  #dbName = uuidv7();
  #idbIndex: FilterBy;

  constructor(public mode: ModeName) {
    this.#idbIndex = MODES[mode].filterBy;
  }

  #tmiSetup(channels: string[]) {
    this.#tmiClient = new tmi.Client({
      channels: [...channels],
      logger: {
        info: () => {},
        warn: () => {},
        error: () => {},
      },
    });
  }

  async #idbSetup() {
    this.idb = await openDB(this.#dbName, 1, {
      upgrade: (db) => {
        const store = db.createObjectStore('logs', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex(this.#idbIndex, this.#idbIndex);
      },
    });
  }

  async connect(channels: string[]) {
    this.#tmiSetup(channels);
    await this.#idbSetup();
    await this.#tmiClient.connect();
  }

  async disconnect() {
    this.#tmiClient.removeAllListeners();
    await this.#tmiClient.disconnect();
    this.idb.close();
  }

  setListeners(handler: ToSave, events: EventType[]) {
    const eventHandlers = new Map<keyof Events, Function>();

    for (const event of events) {
      switch (event) {
        case 'chat': {
          const fn = handler.onMessage.bind(handler);
          eventHandlers.set('message', fn);
          this.#tmiClient.on('message', fn);
          break;
        }
        case 'sub': {
          const fn = handler.onSubscription.bind(handler);
          eventHandlers.set('subscription', fn);
          this.#tmiClient.on('subscription', fn);
          break;
        }
        case 'resub': {
          const fn = handler.onResub.bind(handler);
          eventHandlers.set('resub', fn);
          this.#tmiClient.on('resub', fn);
          break;
        }
        case 'cheer': {
          const fn = handler.onCheer.bind(handler);
          eventHandlers.set('cheer', fn);
          this.#tmiClient.on('cheer', fn);
          break;
        }
        case 'subgift': {
          const fn1 = handler.onSubgift.bind(handler);
          const fn2 = handler.onSubmysterygift.bind(handler);
          eventHandlers.set('subgift', fn1);
          this.#tmiClient.on('subgift', fn1);
          eventHandlers.set('submysterygift', fn2);
          this.#tmiClient.on('submysterygift', fn2);
          break;
        }
      }
    }

    return eventHandlers;
  }

  unsetListeners(eventHandlers: Map<keyof Events, () => void>) {
    eventHandlers.forEach((value, key) => {
      this.#tmiClient.removeListener(key, value);
    });
  }
}

export default Spy;
