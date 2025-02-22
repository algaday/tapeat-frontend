import { MenuItemV2 } from '../model/schema';

export type GetMenuItemsByRestaurantBranchIdResponse = MenuItemV2[];
export type GetMenuItemsByRestaurantBranchIdRequest = {
  restaurantBranchId: string;
  excludeIds?: string[];
  categoryId?: string;
};
