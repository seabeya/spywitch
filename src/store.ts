import { create } from 'zustand';

import { Event, Mode, Status } from '@/types';
import type Spy from '@/lib/Spy';

type useMode = {
  mode: Mode;
};

export const useModeStore = create<useMode>()(() => ({
  mode: 'Users',
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
  status: 'idle',
}));

type useSpy = {
  spy: Spy;
};

export const useSpyStore = create<useSpy>()(() => ({
  spy: {} as Spy,
}));
