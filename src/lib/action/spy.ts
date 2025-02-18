import tmi, { Events } from 'tmi.js';
import { openDB, IDBPDatabase } from 'idb';
import ToSave from './to-save';
import ToShow from './to-show';
import { MODES } from '@/system/consts';
import { EventType, FilterBy, ModeName } from '@/system/types';
import { v7 as uuidv7 } from 'uuid';

class Spy {
  #tmiClient = {} as tmi.Client;
  idb = {} as IDBPDatabase;
  #dbName = uuidv7();
  idbIndex: FilterBy;

  constructor(
    mode: ModeName,
    private events: EventType[],
  ) {
    this.idbIndex = MODES[mode].filterBy;
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
        store.createIndex(this.idbIndex, this.idbIndex);
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

  setListeners(handler: ToSave | ToShow) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventHandlers = new Map<keyof Events, (...args: any[]) => void>();

    for (const event of this.events) {
      switch (event) {
        case 'chat': {
          const fn = handler.onChat.bind(handler);
          eventHandlers.set('chat', fn);
          this.#tmiClient.on('chat', fn);
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

  getAllByTarget(target: string) {
    return this.idb.getAllFromIndex('logs', this.idbIndex, target);
  }
}

export default Spy;
