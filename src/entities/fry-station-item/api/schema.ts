import { z } from 'zod';

import { FryStationItem } from '../model/schema';

export const createFryStationItemSchema = z.object({
  fryStationId: z.string().min(1, { message: 'Выберите fry station' }),
  name: z.string().min(1, { message: 'Выберите название' }),
  maxDropAmount: z.string().min(1, { message: 'Введите максимум количество для жарки' }),
});

export type GetFryStationItemsResponse = FryStationItem[];
export type GetFryStationItemsRequest = { fryStationId: string };

export type CreateFryStationItemRequest = z.infer<typeof createFryStationItemSchema>;
export type CreateFryStationItemResponse = FryStationItem;

export type ResetFryStationItemsResponse = void;
export type ResetFryStationItemsRequest = { fryStationId: string };
