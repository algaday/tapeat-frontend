import { validateResponse } from '@/shared/lib/validate-response';
import { baseApi, MENU_ITEMS_TAG, USER_TAG } from '@shared/api';

import { CreateOwnerDto, User, UserSchema } from './type';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
      }),
      invalidatesTags: [USER_TAG, MENU_ITEMS_TAG],
    }),

    registerOwner: build.mutation<User, CreateOwnerDto>({
      query: (user) => ({
        url: 'restaurant-owner/signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [USER_TAG],
      transformResponse: validateResponse(UserSchema),
    }),

    login: build.mutation<User, { email: string; password: string }>({
      query: (user) => ({
        url: 'auth/signin',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [USER_TAG],
      transformResponse: validateResponse(UserSchema),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterOwnerMutation } = userApi;
