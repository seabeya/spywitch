import { create } from 'zustand';
import { ModeName } from './spy';

const useModeStore = create<ModeName>()(() => 'users');

export { useModeStore };
