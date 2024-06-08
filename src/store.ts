import { create } from 'zustand';

import { Event, Status, Mode } from '@/types';
import { modeOptions, statusOptions } from '@/consts';

import type Spy from '@/lib/Spy';

type useMode = {
  mode: Mode;
};

export const useModeStore = create<useMode>()(() => ({
  mode: modeOptions[0],
}));

type useItems = {
  users: string[];
  events: Event[];
  channels: string[];
};

export const useItemsStore = create<useItems>()(() => ({
  users: [],
  events: [],
  channels: [],
}));

type useStatus = {
  status: Status;
};

export const useStatusStore = create<useStatus>()(() => ({
  status: statusOptions[0],
}));

type useSpy = {
  spy: Spy;
};

export const useSpyStore = create<useSpy>()(() => ({
  spy: {} as Spy,
}));
