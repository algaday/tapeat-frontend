import { z } from 'zod';

const fryStationModifier = z.object({
  id: z.string(),
  name: z.string(),
  groupName: z.string().nullable(),
});

const fryStationMenuItem = z.object({
  id: z.string(),
  name: z.string(),
});

const fryStationItemMapping = z.object({
  id: z.string(),
  fryStationId: z.string(),
  fryStationMenuItemId: z.string(),
  menuItem: fryStationMenuItem,
  modifierItems: fryStationModifier.array(),
  quantityMultiplier: z.number(),
});

export type FryStationItemMapping = z.infer<typeof fryStationItemMapping>;
