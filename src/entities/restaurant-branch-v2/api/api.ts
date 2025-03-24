import { MENU_ITEMS_V2, baseV2Api } from '@shared/api';

import { GetRestaurantBranchByIdResponse, GetRestaurantBranchByIdRequest } from './schema';

export const menuItemV2Api = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getRestaurantBranchById: build.query<GetRestaurantBranchByIdResponse, GetRestaurantBranchByIdRequest>({
        query: ({ restaurantBranchId }) => `restaurant-branches/${restaurantBranchId}`,
        providesTags: [MENU_ITEMS_V2],
      }),
    };
  },
});

export const { useGetRestaurantBranchByIdQuery } = menuItemV2Api;
