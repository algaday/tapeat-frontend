import { z } from 'zod';

const fryStation = z.object({
  id: z.string(),
  restaurantBranchId: z.string(),
});

export type FryStation = z.infer<typeof fryStation>;
