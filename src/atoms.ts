import { atom } from 'jotai';

import tmi from 'tmi.js';
import { IDBPDatabase } from 'idb';

// Main input atoms:
export const atom_users = atom([] as string[]);
export const atom_channels = atom([] as string[]);

// Connection atom:
export const atom_tmiConn = atom({} as tmi.Client);
export const atom_idbConn = atom({} as IDBPDatabase);

// Spy general status atom:
export const atom_status = atom({ active: false, uCount: 0, cCount: 0 });

// isLoading atom:
export const atom_isLoading = atom(false);
