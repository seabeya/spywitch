export type Mode = 'Users' | 'Events';

export type Status = 'idle' | 'loading' | 'running';

export type ChatData = {
  uniqueId: string;
  user: string;
  channel: string;
  message: string;
  type: null | string;
};

export type MessageData = ChatData & {
  date: Date;
};
