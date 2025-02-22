import { FRY_STATION_ITEMS, baseV2Api } from '@shared/api';

import {
  CreateFryStationItemRequest,
  CreateFryStationItemResponse,
  GetFryStationItemsRequest,
  GetFryStationItemsResponse,
} from './schema';

export const fryStationItemApi = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getByFryStationId: build.query<GetFryStationItemsResponse, GetFryStationItemsRequest>({
        query: ({ fryStationId }) => `fry-stations/${fryStationId}/items`,
        providesTags: [FRY_STATION_ITEMS],
      }),

      create: build.mutation<CreateFryStationItemResponse, CreateFryStationItemRequest>({
        query: ({ fryStationId, ...body }) => ({
          method: 'POST',
          url: `fry-stations/${fryStationId}/items`,
          body,
        }),
        invalidatesTags: [FRY_STATION_ITEMS],
      }),
    };
  },
});

export const { useCreateMutation, useGetByFryStationIdQuery } = fryStationItemApi;
