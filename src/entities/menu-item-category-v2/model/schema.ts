import { z } from 'zod';

const menuItemCategoryV2Schema = z.object({
  id: z.string(),
  name: z.string(),
});

export type MenuItemCategoryV2 = z.infer<typeof menuItemCategoryV2Schema>;
