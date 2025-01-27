import { create } from 'zustand';
import { FieldName, ModeName } from './spy';

const useModeStore = create<ModeName>()(() => 'users');

type useInput = Record<FieldName, string[]>;

const useInputStore = create<useInput>()(() => ({
  users: [],
  events: [],
  channels: [],
}));

export { useModeStore, useInputStore };
