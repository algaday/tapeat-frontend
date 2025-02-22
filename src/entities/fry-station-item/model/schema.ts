import { z } from 'zod';

const fryStationItem = z.object({
  id: z.string(),
  fryStationId: z.string(),
  name: z.string(),
  maxDropAmount: z.number(),
  quantity: z.number(),
});

export type FryStationItem = z.infer<typeof fryStationItem>;
