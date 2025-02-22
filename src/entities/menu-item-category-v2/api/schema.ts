import { MenuItemCategoryV2 } from '../model/schema';

export type GetMenuItemCategoriesByRestaurantBranchIdResponse = MenuItemCategoryV2[];
export type GetMenuItemCategoriesByRestaurantBranchIdRequest = {
  restaurantBranchId: string;
};
