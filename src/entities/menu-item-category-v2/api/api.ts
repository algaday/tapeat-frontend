import { MENU_ITEMS_V2, baseV2Api } from '@shared/api';

import {
  GetMenuItemCategoriesByMenuIdResponse,
  GetMenuItemCategoriesByMenuIdRequest,
} from './schema';

export const menuItemV2Api = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getMenuItemCategoriesByMenuId: build.query<
        GetMenuItemCategoriesByMenuIdResponse,
        GetMenuItemCategoriesByMenuIdRequest
      >({
        query: ({ menuId }) => {
          return `menu/${menuId}/categories`;
        },
        providesTags: [MENU_ITEMS_V2],
      }),
    };
  },
});

export const { useGetMenuItemCategoriesByMenuIdQuery } = menuItemV2Api;
