type Modes = { name: string; description: string }[];

const MODES = [
  {
    name: 'users',
    description: 'Monitor chat messages and events from selected users in selected channels.',
  },
  {
    name: 'events',
    description: 'Monitor selected events in selected channels.',
  },
  {
    name: 'everything',
    description: 'Monitor all chat messages and events in selected channels.',
  },
] as const satisfies Modes;

export { MODES };
