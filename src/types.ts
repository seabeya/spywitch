import { eventOptions, dbIndex, modeOptions, statusOptions } from '@/consts';

export type Mode = (typeof modeOptions)[number];

export type Status = (typeof statusOptions)[number];

export type Event = (typeof eventOptions)[number];

export type DBIndex = (typeof dbIndex)[keyof typeof dbIndex];

export type ChatData = {
  uniqueId: string;
  event: Event;
  fromUser: string;
  channel: string;
  info: string | null;
  message: string | null;
};

export type MessageData = {
  date: Date;
} & ChatData;
