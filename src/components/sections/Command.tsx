'use client';

import SectionArea from '@/components/shared/SectionArea';
import { useModeStore } from '@/store';
import ModeUsers from '@/components/sections/ModeUsers';

export default function Command() {
  const Mode = useModeStore((state) => state.mode);

  const modeSections = {
    Users: <ModeUsers />,
    Events: <div>Events Mode!</div>,
  };

  return <SectionArea label="Command">{modeSections[Mode]}</SectionArea>;
}
