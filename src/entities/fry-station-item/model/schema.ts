import { string, z } from 'zod';

const fryStationItemSubstitution = z.object({
  substituteItemId: z.string(),
  quantityMultiplier: z.number(),
  substituteItemName: z.string(),
  maxDropAmount: z.number(),
});

const fryStationItem = z.object({
  id: z.string(),
  fryStationId: z.string(),
  name: z.string(),
  maxDropAmount: z.number(),
  substitutions: z.array(fryStationItemSubstitution).optional(),
});

const fryStationItemQuantity = z.object({
  fryStationId: z.string(),
  fryStationItemId: z.string(),
  quantity: z.number(),
})

export type FryStationItem = z.infer<typeof fryStationItem>;
export type FryStationItemSubstitution = z.infer<typeof fryStationItemSubstitution>;
export type FryStationItemQuantity = z.infer<typeof fryStationItemQuantity>;