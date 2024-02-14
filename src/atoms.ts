import { atom } from 'jotai';

import tmi from 'tmi.js';
import { IDBPDatabase } from 'idb';

// Main form input atoms:
export const atom_usersInput = atom('');
export const atom_channelsInput = atom('');

// Submitted form data atoms:
export const atom_usersArr = atom([] as string[]);
export const atom_channelsArr = atom([] as string[]);

// Connection atom:
export const atom_tmiConn = atom({} as tmi.Client);
export const atom_idbConn = atom({} as IDBPDatabase);

// Spy switch atom:
export const atom_isSpyOn = atom(false);

// isLoading atom:
export const atom_isLoading = atom(false);
