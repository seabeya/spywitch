'use client';

import SectionArea from '@/components/shared/SectionArea';
import { useModeStore } from '@/store';

export default function Command() {
  const Mode = useModeStore((state) => state.mode);

  const modeSections = {
    Users: <div>Users Mode!</div>,
    Events: <div>Events Mode!</div>,
  };

  return <SectionArea label="Command">{modeSections[Mode]}</SectionArea>;
}
