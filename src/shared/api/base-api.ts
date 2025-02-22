import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery, baseV2Query } from './base-query';
import {
  FRY_STATION,
  FRY_STATION_ITEM,
  FRY_STATION_ITEM_MAPPING,
  FRY_STATION_ITEM_MAPPINGS,
  FRY_STATION_ITEMS,
  INVENTORY_COUNT,
  INVENTORY_COUNTS,
  MENU_ITEM_V2,
  MENU_ITEMS_TAG,
  MENU_ITEMS_V2,
  MODIFICATION_GROUP_TAG,
  MODIFIER_ITEM_V2,
  MODIFIER_ITEMS_V2,
  RESTAURANT_BRANCH_TAG,
  USER_TAG,
} from './tags';

export const baseApi = createApi({
  tagTypes: [
    USER_TAG,
    RESTAURANT_BRANCH_TAG,
    MENU_ITEMS_TAG,
    MODIFICATION_GROUP_TAG,
    INVENTORY_COUNT,
    INVENTORY_COUNTS,
  ],
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});

export const baseV2Api = createApi({
  tagTypes: [
    FRY_STATION,
    FRY_STATION_ITEM,
    FRY_STATION_ITEMS,
    FRY_STATION_ITEM_MAPPING,
    FRY_STATION_ITEM_MAPPINGS,
    MENU_ITEM_V2,
    MENU_ITEMS_V2,
    MODIFIER_ITEM_V2,
    MODIFIER_ITEMS_V2
  ],
  reducerPath: 'api/v2',
  baseQuery: baseV2Query,
  endpoints: () => ({}),
});
