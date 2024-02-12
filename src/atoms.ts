import { atom } from 'jotai';
import tmi from 'tmi.js';

// Main form input atoms:
export const atom_usersInput = atom('');
export const atom_channelsInput = atom('');

// Submitted form data atoms:
export const atom_usersArr = atom([] as string[]);
export const atom_channelsArr = atom([] as string[]);

// Connection atom:
export const atom_tmiConn = atom({} as tmi.Client);

// Spy switch atom:
export const atom_isSpyOn = atom(false);
