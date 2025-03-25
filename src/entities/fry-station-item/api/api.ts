import { FRY_STATION_ITEMS, baseV2Api } from '@shared/api';

import {
  AddFryStationItemSubstitutionRequest,
  AddFryStationItemSubstitutionResponse,
  CreateFryStationItemRequest,
  CreateFryStationItemResponse,
  GetAllFryStationItemsRequest,
  GetAllFryStationItemsResponse,
  GetFryStationItemByIdRequest,
  GetFryStationItemByIdResponse,
  ResetFryStationItemsRequest,
  ResetFryStationItemsResponse,
} from './schema';

export const fryStationItemApi = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getFryStationItems: build.query<GetAllFryStationItemsResponse, GetAllFryStationItemsRequest>({
        query: () => `fry-station-items`,
        providesTags: [FRY_STATION_ITEMS],
      }),

      getFryStationItemById: build.query<
        GetFryStationItemByIdResponse,
        GetFryStationItemByIdRequest
      >({
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
        query: (body) => ({
          method: 'POST',
          url: `fry-station-items`,
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
  useGetFryStationItemsQuery,
  useResetItemsMutation,
  useGetFryStationItemByIdQuery,
  useCreateSubstitutionMutation,
  useUpdateSubstitutionMutation,
} = fryStationItemApi;
