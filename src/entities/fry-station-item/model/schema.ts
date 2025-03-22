import { z } from 'zod';

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
  quantity: z.number(),
  substitutions: z.array(fryStationItemSubstitution).optional(),
});

export type FryStationItem = z.infer<typeof fryStationItem>;
export type FryStationItemSubstitution = z.infer<typeof fryStationItemSubstitution>;

export type FryStationItemWithShortSubstitution = FryStationItem & {
  substitutions: ShortFryStationItemSubstitution[];
};
export type ShortFryStationItemSubstitution = Pick<FryStationItemSubstitution, 'quantityMultiplier' | 'substituteItemId'>
