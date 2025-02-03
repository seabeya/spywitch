import { create } from 'zustand';
import { FieldName, ModeName } from './spy';
import { STATUS } from './consts';

// Mode
const useModeStore = create<ModeName>()(() => 'users');

// Inputs
const useInputStore = create<Record<FieldName, string[]>>()(() => ({
  users: [],
  events: [],
  channels: [],
}));

// Status
type Status = (typeof STATUS)[number];
const useStatusStore = create<Status>()(() => 'idle');

// Spying State
const useIsActiveStore = create<boolean>()(() => false);

useStatusStore.subscribe((state) => {
  useIsActiveStore.setState(state === 'idle' ? false : true);
});

export { useModeStore, useInputStore, useStatusStore, useIsActiveStore };
