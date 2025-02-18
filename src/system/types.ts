import { EVENTS } from './consts';

export type FieldName = 'users' | 'events' | 'channels';
export type FieldType = 'input' | 'select';
export type Fields = {
  [T in FieldName]: {
    name: T;
    type: FieldType;
    hint: string;
    placeholder: string;
  };
};

export type ModeName = 'users' | 'events';

export type FilterBy = `${FieldName extends `${infer T}s` ? T : FieldName}`;
export type Modes = {
  [T in ModeName]: {
    name: T;
    description: string;
    fields: Fields[keyof Fields][];
    filterBy: FilterBy;
  };
};

export type Status = 'idle' | 'loading' | 'running';

export type EventType = (typeof EVENTS)[number];

export type EventData = {
  uid: string;
  name: EventType;
  user: string;
  channel: string;
  message: string | null;
  extra: string | null;
};

export type Log = {
  date: Date;
} & EventData;
