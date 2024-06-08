'use client';

import SectionArea from '@/components/shared/SectionArea';
import { useModeStore } from '@/store';
import ModeUsers from '@/components/sections/ModeUsers';
import ModeEvents from '@/components/sections/ModeEvents';

export default function Command() {
  const Mode = useModeStore((state) => state.mode);

  const modeSections = {
    users: <ModeUsers />,
    events: <ModeEvents />,
  };

  return <SectionArea title="Command">{modeSections[Mode]}</SectionArea>;
}
