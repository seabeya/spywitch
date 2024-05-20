export type Mode = 'Users' | 'Events';

export type Status = 'idle' | 'loading' | 'running';

export type Event = 'chat' | 'sub' | 'resub' | 'cheer' | 'subgift';

export type ChatData = {
  uniqueId: string;
  event: Event;
  user: string;
  channel: string;
  info: string | null;
  message: string | null;
};

export type MessageData = {
  date: Date;
} & ChatData;
