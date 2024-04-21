import { create } from 'zustand';

import { Mode, Status } from '@/types';
import type Spy from '@/lib/Spy';

type useMode = {
  mode: Mode;
};

export const useModeStore = create<useMode>()(() => ({
  mode: 'Users',
}));

type useItems = {
  items1: string[];
  items2: string[];
};

export const useItemsStore = create<useItems>()(() => ({
  items1: [],
  items2: [],
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
