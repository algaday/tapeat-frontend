import { createSlice } from '@reduxjs/toolkit';

import { restaurantBranchApi } from '../api/restaurant-branch-api';
import { RestaurantBranch } from '../api/types';

type RestaurantBranchState = {
  branches: RestaurantBranch[] | [];
};
const initialState: RestaurantBranchState = {
  branches: [],
};

export const restaurantBranchSlice = createSlice({
  name: 'restaurantBranch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      restaurantBranchApi.endpoints.getBranches.matchFulfilled,
      (state, action) => {
        state.branches = action.payload;
      },
    );
  },
});
