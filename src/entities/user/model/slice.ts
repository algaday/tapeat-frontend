import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Address, DeliveryOption, UserState } from './types';
import { User } from '../api/type';
import { userApi } from '../api/user-api';

const initialState: UserState = {
  user: null,
  address: null,
  deliveryOption: 'delivery',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.address = null;
    },

    addAddress: (state, { payload }: PayloadAction<Address>) => {
      state.address = payload;
    },

    updateDeliveryOption: (state, { payload }: PayloadAction<DeliveryOption>) => {
      state.deliveryOption = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })

      .addMatcher(
        userApi.endpoints.registerOwner.matchFulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        },
      );
  },
});

export const { clearUser, addAddress, updateDeliveryOption } = userSlice.actions;

export const userReducer = userSlice.reducer;
