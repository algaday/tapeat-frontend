import { MENU_ITEMS_V2, baseV2Api } from '@shared/api';

import {
  GetMenuItemsByRestaurantBranchIdResponse,
  GetMenuItemsByRestaurantBranchIdRequest,
} from './schema';

export const menuItemV2Api = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getMenuItemsByRestaurantBranchId: build.query<
        GetMenuItemsByRestaurantBranchIdResponse,
        GetMenuItemsByRestaurantBranchIdRequest
      >({
        query: ({ restaurantBranchId, excludeIds = [], categoryId }) => {
          const params = new URLSearchParams();
          // Append each excludeId separately to match `excludeIds[]=id1&excludeIds[]=id2`
          excludeIds.forEach((id) => params.append('excludeIds[]', id));

          if (categoryId) {
            params.append('categoryId', categoryId);
          }

          return `restaurant-branches/${restaurantBranchId}/menu-items?${params.toString()}`;
        },
        providesTags: [MENU_ITEMS_V2],
      }),
    };
  },
});

export const { useGetMenuItemsByRestaurantBranchIdQuery } = menuItemV2Api;
