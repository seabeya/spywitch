import { atom } from 'jotai';

import tmi from 'tmi.js';
import { IDBPDatabase } from 'idb';

// Submitted form data atoms:
export const atom_users = atom([] as string[]);
export const atom_channels = atom([] as string[]);

// Connection atom:
export const atom_tmiConn = atom({} as tmi.Client);
export const atom_idbConn = atom({} as IDBPDatabase);

// Spy switch atom:
export const atom_isSpyOn = atom(false);

// isLoading atom:
export const atom_isLoading = atom(false);
