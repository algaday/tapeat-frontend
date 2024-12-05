import { createSlice } from '@reduxjs/toolkit';

import { menuItemsApi } from '../api/menu-items-api';
import { MenuItemsSchema } from '../api/types';

type MenuItemsState = {
  menuItems: MenuItemsSchema[] | [];
};

const initialState: MenuItemsState = {
  menuItems: [],
};

export const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(menuItemsApi.endpoints.getAllMenuItems.matchFulfilled, (state, action) => {
      state.menuItems = action.payload;
    });
  },
});
