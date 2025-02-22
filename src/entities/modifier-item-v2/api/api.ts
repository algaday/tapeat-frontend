import { MENU_ITEMS_V2, baseV2Api } from '@shared/api';

import {
  GetModifierItemByMenuItemIdResponse,
  GetModifierItemByMenuItemIdRequest,
} from './schema';

export const modifierItemV2Api = baseV2Api.injectEndpoints({
  endpoints: (build) => {
    return {
      getModifierItemsByMenuItemId: build.query<
        GetModifierItemByMenuItemIdResponse,
        GetModifierItemByMenuItemIdRequest
      >({
        query: ({ menuItemId }) => {
          return `menu-items/${menuItemId}/modifier-items`;
        },
        providesTags: [MENU_ITEMS_V2],
      }),
    };
  },
});

export const { useGetModifierItemsByMenuItemIdQuery } = modifierItemV2Api;
