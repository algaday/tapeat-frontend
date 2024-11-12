import { baseApi, INVENTORY_COUNT, INVENTORY_COUNTS } from '@shared/api';
import { validateResponse } from '@shared/lib/validate-response';

import {
  BranchInventoryCountTemplatesResponse,
  CreateInventoryCountRequest,
  CreateInventoryCountResponse,
  GetInventoryCountResponse,
  GetInventoryCountsRequest,
  GetInventoryCountsResponse,
  inventoryCount,
  UpdateInventoryCountItemRequest,
  UpdateInventoryCountRequest,
} from './types';

export const inventoryCountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createInventoryCount: build.mutation<CreateInventoryCountResponse, CreateInventoryCountRequest>(
      {
        query: (data) => ({
          url: 'inventory-counts',
          method: 'POST',
          body: data,
        }),
        transformResponse: validateResponse(inventoryCount),
        invalidatesTags: [INVENTORY_COUNTS],
      },
    ),

    getBranchInventoryCountTemplates: build.query<BranchInventoryCountTemplatesResponse, string>({
      query: (branchId) => `inventory-count-templates/branches/${branchId}`,
    }),

    getInventoryCounts: build.query<GetInventoryCountsResponse, GetInventoryCountsRequest>({
      query: ({ ids, status }) => `inventory-counts?ids=${ids.join(',')}&status=${status}`,

      providesTags: [INVENTORY_COUNTS],
    }),

    getInventoryCount: build.query<GetInventoryCountResponse, string>({
      query: (id) => `inventory-counts/${id}`,
      providesTags: [INVENTORY_COUNT],
    }),

    updateInventoryCountItemQuantity: build.mutation<null, UpdateInventoryCountItemRequest>({
      query: ({ inventoryCountId, itemId, quantity }) => ({
        method: 'PUT',
        url: `inventory-counts/${inventoryCountId}/items/${itemId}`,
        body: { quantity },
      }),
      invalidatesTags: [INVENTORY_COUNT],
    }),
    updateInventoryCount: build.mutation<null, UpdateInventoryCountRequest>({
      query: ({ inventoryCountId, status }) => ({
        method: 'PUT',
        url: `inventory-counts/${inventoryCountId}`,
        body: { status },
      }),
      invalidatesTags: [INVENTORY_COUNT, INVENTORY_COUNTS],
    }),
  }),
});

export const {
  useCreateInventoryCountMutation,
  useGetBranchInventoryCountTemplatesQuery,
  useGetInventoryCountsQuery,
  useGetInventoryCountQuery,
  useUpdateInventoryCountItemQuantityMutation,
  useUpdateInventoryCountMutation,
} = inventoryCountApi;
