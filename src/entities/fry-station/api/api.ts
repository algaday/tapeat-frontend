import { FRY_STATION, baseV2Api } from '@shared/api';

import {
  GetFryStationByRestaurantBranchIdResponse,
  GetFryStationByRestaurantBranchIdRequest,
} from './schema';

export const fryStationApi = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getByRestaurantBranchId: build.query<
        GetFryStationByRestaurantBranchIdResponse,
        GetFryStationByRestaurantBranchIdRequest
      >({
        query: ({ restaurantBranchId }) => `restaurant-branches/${restaurantBranchId}/fry-station`,
        providesTags: [FRY_STATION],
      }),
    };
  },
});

export const { useGetByRestaurantBranchIdQuery } = fryStationApi;
