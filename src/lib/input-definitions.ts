import { EVENTS } from '@/system/consts';
import { z } from 'zod';

const username = z
  .string({ invalid_type_error: 'Invalid input type' })
  .min(1, '')
  .regex(/^[a-zA-Z0-9_]+$/, 'Must contain only letters (a-z), numbers (0-9), and underscores (_)')
  .regex(/^[^_]/, 'Must not start with an underscore (_)')
  .max(25, 'Must be at most 25 characters long')
  .toLowerCase();

const events = z.enum(EVENTS, {
  invalid_type_error: 'Invalid event type',
  message: `Must be one of: ${EVENTS.join(', ')}`,
});

const inputDefinitions = {
  users: username,
  events: events,
  channels: username,
};

export default inputDefinitions;
