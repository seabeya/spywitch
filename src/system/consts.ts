const FIELDS = {
  users: {
    name: 'users',
    type: 'input',
    hint: 'The users you want to track',
    placeholder: 'Enter usernames',
  },
  events: {
    name: 'events',
    type: 'select',
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

const MODES = {
  users: {
    name: 'users',
    description: 'Monitor all events from chosen users in selected channels',
    fields: [FIELDS.users, FIELDS.channels],
  },
  events: {
    name: 'events',
    description: 'Monitor selected events from everyone in selected channels',
    fields: [FIELDS.events, FIELDS.channels],
  },
} as const;

const EVENTS = ['chat', 'sub', 'resub', 'cheer', 'subgift'] as const;

export { FIELDS, MODES, EVENTS };
