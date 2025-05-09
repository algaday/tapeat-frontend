import { z } from 'zod';

const restaurantBranchV2Schema = z.object({
  id: z.string(),
  name: z.string(),
  menuId: z.string(),
});

export type RestaurantBranchV2 = z.infer<typeof restaurantBranchV2Schema>;
