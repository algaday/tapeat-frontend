import { z } from 'zod';

const modifierItemV2Schema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.object({
    id: z.string(),
    name: z.string(),
  })
});

export type ModifierItemV2 = z.infer<typeof modifierItemV2Schema>;
