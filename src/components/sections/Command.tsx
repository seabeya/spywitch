'use client';

import SectionArea from '@/components/shared/SectionArea';
import { useModeStore } from '@/store';
import ModeUsers from '@/components/sections/ModeUsers';
import ModeEvents from '@/components/sections/ModeEvents';

export default function Command() {
  const Mode = useModeStore((state) => state.mode);

  const modeSections = {
    Users: <ModeUsers />,
    Events: <ModeEvents />,
  };

  return <SectionArea label="Command">{modeSections[Mode]}</SectionArea>;
}
