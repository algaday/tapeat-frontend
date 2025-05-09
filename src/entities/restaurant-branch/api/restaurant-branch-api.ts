import { validateResponse } from '@/shared/lib/validate-response';
import { baseApi, RESTAURANT_BRANCH_TAG } from '@shared/api';

import { CreateBranchDto, RestaurantBranch, restaurantBranchSchema } from './types';

export const restaurantBranchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBranch: build.mutation<RestaurantBranch, CreateBranchDto>({
      query: (branch) => ({
        url: 'restaurant-branch/create',
        method: 'POST',
        body: branch,
      }),
      transformResponse: validateResponse(restaurantBranchSchema),
      invalidatesTags: [RESTAURANT_BRANCH_TAG],
    }),
    deleteBranch: build.mutation<RestaurantBranch, { branchId: string }>({
      query: (branch) => ({
        url: 'restaurant-branch/branches',
        method: 'DELETE',
        body: branch,
      }),
      invalidatesTags: [RESTAURANT_BRANCH_TAG],
    }),
    getBranches: build.query<RestaurantBranch[], void>({
      query: () => `restaurant-branch/branches`,
      providesTags: [RESTAURANT_BRANCH_TAG],
    }),

    getRestaurantBranches: build.query<RestaurantBranch[], string>({
      query: (restaurantId) => `restaurant/${restaurantId}/branches`,
      providesTags: [RESTAURANT_BRANCH_TAG],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetBranchesQuery,
  useDeleteBranchMutation,
  useGetRestaurantBranchesQuery,
} = restaurantBranchApi;
