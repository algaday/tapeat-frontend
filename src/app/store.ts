import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { cartSlice } from '@entities/cart';
import { inventoryCountReducer, inventoryCountSlice } from '@entities/inventory-count';
import { menuSlice } from '@entities/menu-item/menu-item-description';
import { menuItemsSlice } from '@entities/menu-item/menu-items';
import { modificationGroupsSlice } from '@entities/modification-group';
import { restaurantBranchSlice } from '@entities/restaurant-branch';
import { addAddressListener, userReducer } from '@entities/user';
import { baseApi, rtkQueryErrorLogger } from '@shared/api';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const reducers = combineReducers({
  user: persistedReducer,
  modificationGroupsSlice: modificationGroupsSlice,
  restaurantBranch: restaurantBranchSlice.reducer,
  cart: cartSlice.reducer,
  menuItem: menuSlice.reducer,
  menuItems: menuItemsSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [inventoryCountSlice.name]: inventoryCountReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, rtkQueryErrorLogger, addAddressListener.middleware),
});
