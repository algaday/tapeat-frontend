import { baseApi, MENU_ITEMS_TAG } from '@/shared/api';

import { ResponseMenuItem, UpdateMenuItemDto } from './types';

export const singleMenuItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleMenuItem: build.query<ResponseMenuItem, string>({
      query: (id) => {
        return `menu/menu-item-info/${id}`;
      },
      providesTags: [MENU_ITEMS_TAG],
    }),

    updateMenuItem: build.mutation<ResponseMenuItem, UpdateMenuItemDto>({
      query: (body) => {
        return {
          url: 'menu/update-menu-item',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [MENU_ITEMS_TAG],
    }),

    deleteMenuItem: build.mutation({
      query: (body) => ({
        url: 'menu/delete-menu-item',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [MENU_ITEMS_TAG],
    }),
  }),
});

export const { useGetSingleMenuItemQuery, useUpdateMenuItemMutation, useDeleteMenuItemMutation } =
  singleMenuItemApi;
