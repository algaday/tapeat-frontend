import { MenuItemV2 } from '../model/schema';

export type GetMenuItemsByMenuIdResponse = MenuItemV2[];
export type GetMenuItemsByMenuIdRequest = {
  menuId: string;
  excludeIds?: string[];
  categoryId?: string;
};
