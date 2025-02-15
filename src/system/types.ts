import { SYS_PAGE_GROUPS } from './pages';
import { FIELDS, MODES } from './consts';

export type NavItems = (typeof SYS_PAGE_GROUPS.navbar)[number]['name'];

export type FieldName = (typeof FIELDS)[keyof typeof FIELDS]['name'];
export type FieldType = (typeof FIELDS)[keyof typeof FIELDS]['type'];

export type Modes = { name: string; description: string; fields: (typeof FIELDS)[FieldName][] }[];
export type ModeName = (typeof MODES)[number]['name'];

export type Status = 'idle' | 'loading' | 'running';
