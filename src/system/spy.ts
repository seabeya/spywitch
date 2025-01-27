const fields = {
  users: {
    name: 'users',
    type: 'input',
    hint: 'The users you want to track',
    placeholder: 'Enter usernames',
  },
  events: {
    name: 'events',
    type: 'pick',
    hint: 'The events you want to track',
    placeholder: 'Pick events from the list above',
  },
  channels: {
    name: 'channels',
    type: 'input',
    hint: 'The channels where you want to perform the tracking',
    placeholder: 'Enter channel names',
  },
} as const;

type FieldName = (typeof fields)[keyof typeof fields]['name'];
type FieldType = (typeof fields)[keyof typeof fields]['type'];

type Modes = { name: string; description: string; fields: (typeof fields)[FieldName][] }[];

const MODES = [
  {
    name: 'users',
    description: 'Monitor chat messages and events from selected users in selected channels',
    fields: [fields.users, fields.channels],
  },
  {
    name: 'events',
    description: 'Monitor selected events in selected channels',
    fields: [fields.events, fields.channels],
  },
  {
    name: 'everything',
    description: 'Monitor all chat messages and events in selected channels',
    fields: [fields.channels],
  },
] as const satisfies Modes;

type ModeName = (typeof MODES)[number]['name'];

export { MODES, type FieldName, type FieldType, type ModeName };
