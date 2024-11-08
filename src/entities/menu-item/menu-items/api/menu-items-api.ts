import { baseApi, MENU_ITEMS_TAG } from '@shared/api';

import { MenuItemsSchema } from './types';

export const menuItemsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMenuItems: build.query<MenuItemsSchema[], void>({
      query: () => `menu/menu-items`,
      providesTags: [MENU_ITEMS_TAG],
    }),
  }),
});

export const { useGetAllMenuItemsQuery } = menuItemsApi;
