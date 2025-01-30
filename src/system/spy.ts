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
    description: 'Monitor all events from chosen users in selected channels',
    fields: [fields.users, fields.channels],
  },
  {
    name: 'events',
    description: 'Monitor selected events from everyone in selected channels',
    fields: [fields.events, fields.channels],
  },
] as const satisfies Modes;

type ModeName = (typeof MODES)[number]['name'];

export { MODES, type FieldName, type FieldType, type ModeName };
