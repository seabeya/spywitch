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

export { useModeStore, useInputStore, useStatusStore };
