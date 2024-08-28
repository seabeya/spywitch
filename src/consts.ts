export const dbPrefix = 'spywitch_db_';

export const modeOptions = ['users', 'events'] as const;

export const modeDescriptions = {
  users: "Track users' chat messages and related events in any Twitch channels.",
  events: 'Track events such as sub, resub, cheers, etc., in any Twitch channels.',
};

export const statusOptions = ['idle', 'loading', 'running'] as const;

export const eventOptions = ['chat', 'sub', 'resub', 'cheer', 'subgift'] as const;

export const dbIndex = {
  users: 'fromUser',
  events: 'channel',
} as const;
