import { z } from 'zod';

import { FryStationItemMapping } from '../model/schema';

export const createFryStationItemMappingSchema = z.object({
  fryStationItemId: z.string().min(1, { message: 'Выберите позицию из меню' }),
  menuItemId: z.string().min(1, { message: 'Выберите позицию из меню' }),
  modifierItemIds: z.array(z.string()),
  quantityMultiplier: z.number({ message: 'Выберите сколько штук добавлять' }).positive(),
});

export type GetFryStationItemMappingsResponse = FryStationItemMapping[];
export type GetFryStationItemMappingsRequest = { fryStationItemId: string };

export type CreateFryStationItemMappingRequest = z.infer<typeof createFryStationItemMappingSchema>;
export type CreateFryStationItemMappingResponse = FryStationItemMapping;
