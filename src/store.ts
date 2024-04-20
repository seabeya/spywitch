import { create } from 'zustand';

import { Mode } from '@/types';

type useMode = {
  mode: Mode;
};

export const useModeStore = create<useMode>()(() => ({
  mode: 'Users',
}));
