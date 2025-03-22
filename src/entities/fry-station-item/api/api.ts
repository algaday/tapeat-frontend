import { FRY_STATION_ITEMS, baseV2Api } from '@shared/api';

import {
  AddFryStationItemSubstitutionRequest,
  AddFryStationItemSubstitutionResponse,
  CreateFryStationItemRequest,
  CreateFryStationItemResponse,
  GetFryStationItemByIdRequest,
  GetFryStationItemByIdResponse,
  GetFryStationItemsRequest,
  GetFryStationItemsResponse,
  ResetFryStationItemsRequest,
  ResetFryStationItemsResponse,
} from './schema';

export const fryStationItemApi = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getByFryStationId: build.query<GetFryStationItemsResponse, GetFryStationItemsRequest>({
        query: ({ fryStationId }) => `fry-stations/${fryStationId}/items`,
        providesTags: [FRY_STATION_ITEMS],
      }),

      getById: build.query<GetFryStationItemByIdResponse, GetFryStationItemByIdRequest>({
        query: ({ fryStationItemId }) => `fry-station-items/${fryStationItemId}`,
        providesTags: [FRY_STATION_ITEMS],
      }),

      createSubstitution: build.mutation<
        AddFryStationItemSubstitutionResponse,
        AddFryStationItemSubstitutionRequest
      >({
        query: ({ fryStationItemId, ...body }) => ({
          method: 'POST',
          url: `fry-station-items/${fryStationItemId}/substitutions`,
          body,
        }),
        invalidatesTags: [FRY_STATION_ITEMS],
      }),

      updateSubstitution: build.mutation<
        AddFryStationItemSubstitutionResponse,
        AddFryStationItemSubstitutionRequest
      >({
        query: ({ fryStationItemId, ...body }) => ({
          method: 'PUT',
          url: `fry-station-items/${fryStationItemId}/substitutions`,
          body,
        }),
        invalidatesTags: [FRY_STATION_ITEMS],
      }),

      create: build.mutation<CreateFryStationItemResponse, CreateFryStationItemRequest>({
        query: ({ fryStationId, ...body }) => ({
          method: 'POST',
          url: `fry-stations/${fryStationId}/items`,
          body,
        }),
        invalidatesTags: [FRY_STATION_ITEMS],
      }),

      resetItems: build.mutation<ResetFryStationItemsResponse, ResetFryStationItemsRequest>({
        query: ({ fryStationId, ...body }) => ({
          method: 'POST',
          url: `fry-stations/${fryStationId}/items/reset`,
          body,
        }),
        invalidatesTags: [FRY_STATION_ITEMS],
      }),
    };
  },
});

export const {
  useCreateMutation,
  useGetByFryStationIdQuery,
  useResetItemsMutation,
  useGetByIdQuery,
  useCreateSubstitutionMutation,
  useUpdateSubstitutionMutation,
} = fryStationItemApi;
