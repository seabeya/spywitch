import { create } from 'zustand';
import { EventType, FieldName, ModeName, Status } from './types';
import Spy from '@/lib/action/spy';

// Mode
const useModeStore = create<ModeName>()(() => 'users');

// Items
type ItemsStore = Record<FieldName, string[]> & {
  events: EventType[];
};

const useItemsStore = create<ItemsStore>()(() => ({
  users: [],
  events: [],
  channels: [],
}));

// Status
const useStatusStore = create<Status>()(() => 'idle');

// Spying State
const useIsActiveStore = create<boolean>()(() => false);

useStatusStore.subscribe((state) => {
  useIsActiveStore.setState(state === 'idle' ? false : true);
});

// Spy Class
const useSpyStore = create<Spy | undefined>()(() => undefined);

export { useModeStore, useItemsStore, useStatusStore, useIsActiveStore, useSpyStore };
