import { SYS_PAGE_GROUPS } from './pages';
import { EVENTS, FIELDS, MODES } from './consts';

export type NavItems = (typeof SYS_PAGE_GROUPS.navbar)[number]['name'];

export type FieldName = (typeof FIELDS)[keyof typeof FIELDS]['name'];
export type FieldType = (typeof FIELDS)[keyof typeof FIELDS]['type'];

export type ModeName = (typeof MODES)[keyof typeof MODES]['name'];
export type FilterBy = (typeof MODES)[keyof typeof MODES]['filterBy'];

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

export type MessageData = {
  date: Date;
} & EventData;
