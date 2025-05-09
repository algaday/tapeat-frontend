import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { inventoryCountApi } from '../api/inventory-count-api';

type InventoryCountState = {
  inventoryCountIds: string[];
};

const initialState: InventoryCountState = {
  inventoryCountIds: [],
};

export const inventoryCountSlice = createSlice({
  name: 'inventoryCount',
  initialState,
  reducers: {
    removeId: (state, action: PayloadAction<{ id: string }>) => {
      state.inventoryCountIds = state.inventoryCountIds.filter((id) => id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      inventoryCountApi.endpoints.createInventoryCount.matchFulfilled,
      (state, action) => {
        state.inventoryCountIds.push(action.payload.id);
      },
    );
  },
});

export const inventoryCountReducer = persistReducer(
  {
    key: 'rtk:inventoryCount',
    storage,
    whitelist: ['inventoryCountIds'],
  },
  inventoryCountSlice.reducer,
);

export const { removeId } = inventoryCountSlice.actions;
