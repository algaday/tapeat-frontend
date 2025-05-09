import { FRY_STATION_ITEM_MAPPINGS, baseV2Api } from '@shared/api';

import {
  CreateFryStationItemMappingRequest,
  CreateFryStationItemMappingResponse,
  GetFryStationItemMappingsRequest,
  GetFryStationItemMappingsResponse,
} from './schema';

export const fryStationItemMappingApi = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getByFryStationItemId: build.query<
        GetFryStationItemMappingsResponse,
        GetFryStationItemMappingsRequest
      >({
        query: ({ fryStationItemId }) => `fry-station-items/${fryStationItemId}/mappings`,
        providesTags: [FRY_STATION_ITEM_MAPPINGS],
      }),

      createFryStationItemMapping: build.mutation<
        CreateFryStationItemMappingResponse,
        CreateFryStationItemMappingRequest
      >({
        query: ({ fryStationItemId, ...body }) => ({
          method: 'POST',
          url: `fry-station-items/${fryStationItemId}/mappings`,
          body,
        }),
        invalidatesTags: [FRY_STATION_ITEM_MAPPINGS],
      }),
    };
  },
});

export const { useCreateFryStationItemMappingMutation, useGetByFryStationItemIdQuery } =
  fryStationItemMappingApi;
