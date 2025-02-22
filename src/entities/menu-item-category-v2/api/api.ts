import { MENU_ITEMS_V2, baseV2Api } from '@shared/api';

import {
  GetMenuItemCategoriesByRestaurantBranchIdResponse,
  GetMenuItemCategoriesByRestaurantBranchIdRequest,
} from './schema';

export const menuItemV2Api = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getMenuItemCategoriesByRestaurantBranchId: build.query<
        GetMenuItemCategoriesByRestaurantBranchIdResponse,
        GetMenuItemCategoriesByRestaurantBranchIdRequest
      >({
        query: ({ restaurantBranchId }) => {
          return `restaurant-branches/${restaurantBranchId}/menu-item-categories`;
        },
        providesTags: [MENU_ITEMS_V2],
      }),
    };
  },
});

export const { useGetMenuItemCategoriesByRestaurantBranchIdQuery } = menuItemV2Api;
