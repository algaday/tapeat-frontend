import { z } from 'zod';

const menuItemV2Schema = z.object({
  id: z.string(),
  name: z.string(),
});

export type MenuItemV2 = z.infer<typeof menuItemV2Schema>;
