import { createSlice } from '@reduxjs/toolkit';

import { modificationGroupApi } from '../api/modification-group-api';
import { ModificationGroup } from '../api/types';

type InitialState = {
  modificationGroups: ModificationGroup[] | [];
};

const initialState: InitialState = {
  modificationGroups: [],
};

export const modificationGroups = createSlice({
  name: 'modificationGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      modificationGroupApi.endpoints.getAllModificationGroups.matchFulfilled,
      (state, action) => {
        state.modificationGroups = action.payload;
      },
    );
  },
});

export const modificationGroupsSlice = modificationGroups.reducer;
