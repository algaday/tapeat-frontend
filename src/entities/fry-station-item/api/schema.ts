import { z } from 'zod';

import { FryStationItem } from '../model/schema';

export const createFryStationItemSchema = z.object({
  fryStationId: z.string().min(1, { message: 'Выберите fry station' }),
  name: z.string().min(1, { message: 'Выберите название' }),
  maxDropAmount: z.string().min(1, { message: 'Введите максимум количество для жарки' }),
});

export const addFryStationItemSubstitutionSchema = z.object({
  fryStationItemId: z.string().min(1, { message: 'Выберите fry station item' }),
  substituteItemId: z.string().min(1, { message: 'Выберите позицию для замену' }),
  quantityMultiplier: z.number({ message: 'Выберите сколько штук добавлять' }).positive(),
});

export type GetFryStationItemsResponse = FryStationItem[];
export type GetFryStationItemsRequest = { fryStationId: string };

export type CreateFryStationItemRequest = z.infer<typeof createFryStationItemSchema>;
export type CreateFryStationItemResponse = FryStationItem;

export type ResetFryStationItemsResponse = void;
export type ResetFryStationItemsRequest = { fryStationId: string };

export type AddFryStationItemSubstitutionRequest = z.infer<
  typeof addFryStationItemSubstitutionSchema
>;
export type AddFryStationItemSubstitutionResponse = FryStationItem;

export type UpdateFryStationItemSubstitutionRequest = AddFryStationItemSubstitutionRequest;
export type UpdateFryStationItemSubstitutionResponse = AddFryStationItemSubstitutionResponse;

export type GetFryStationItemByIdResponse = FryStationItem;
export type GetFryStationItemByIdRequest = { fryStationItemId: string };
