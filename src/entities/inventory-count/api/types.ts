import { z } from 'zod';

import { IngredientUnit, InventoryCountStatus } from '@shared/constants';

export const createInventoryCountSchema = z.object({
  staffName: z.string().min(3, { message: 'Напишите ваше имя и фамилию' }),
  branchName: z.string().min(3, { message: 'Выберите ваш филиал' }),
  inventoryCountTemplateId: z.string().min(1, { message: 'Выберите ваш шаблон' }),
});

const inventoryCountItem = z.object({
  id: z.string(),
  storageName: z.string(),
  name: z.string(),
  quantity: z.number().nullable(),
  unit: z.enum(Object.values(IngredientUnit) as [string, ...string[]]),
  type: z.string(),
});

const inventoryCountStorage = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  items: z.array(inventoryCountItem),
});

const inventoryCountStorageWithoutItems = inventoryCountStorage.omit({ items: true });

export const inventoryCount = z.object({
  id: z.string(),
  staffName: z.string(),
  branchName: z.string(),
  templateName: z.string(),
  createdAt: z.string(),
  status: z.enum(Object.values(InventoryCountStatus) as [string, ...string[]]),
  storages: z.array(inventoryCountStorage),
});

const inventoryCountWithoutItems = inventoryCount.extend({
  storages: z.array(inventoryCountStorageWithoutItems),
});

export const inventoryCounts = z.array(inventoryCountWithoutItems);

export const inventoryCountTemplate = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  storages: z.array(inventoryCountStorage),
});

export type InventoryCount = z.infer<typeof inventoryCount>;

export type CreateInventoryCountSchema = z.infer<typeof createInventoryCountSchema>;

export type InventoryCountTemplate = z.infer<typeof inventoryCountTemplate>;

export type InventoryCountStorage = z.infer<typeof inventoryCountStorage>;

export type InventoryCountItem = z.infer<typeof inventoryCountItem>;

export type BranchInventoryCountTemplatesResponse = InventoryCountTemplate[];

export type CreateInventoryCountRequest = CreateInventoryCountSchema;
export type CreateInventoryCountResponse = InventoryCount;

export type GetInventoryCountsResponse = z.infer<typeof inventoryCounts>;
export type GetInventoryCountsRequest = { ids: string[]; status: InventoryCountStatus };

export type GetInventoryCountResponse = InventoryCount;

export interface UpdateInventoryCountItemRequest {
  itemId: string;
  quantity: number;
  inventoryCountId: string;
}
export interface UpdateInventoryCountRequest {
  inventoryCountId: string;
  status?: InventoryCountStatus;
}
