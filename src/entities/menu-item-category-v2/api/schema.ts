import { MenuItemCategoryV2 } from '../model/schema';

export type GetMenuItemCategoriesByMenuIdResponse = MenuItemCategoryV2[];
export type GetMenuItemCategoriesByMenuIdRequest = {
  menuId: string;
};
