import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type FryStationMonitoringState = {
  completionHistory: { fryStationItemId: string; quantityDelta: number; timestamp: string }[][];
  completedQuantities: Record<string, number>;
};

const initialState: FryStationMonitoringState = {
  completionHistory: [],
  completedQuantities: {},
};

export const fryStationMonitoringSlice = createSlice({
  name: 'fryStationMonitoring',
  initialState,
  reducers: {
    // uses history and can be reverted
    recordCompletedFryItemQuantityChange: (
      state,
      action: PayloadAction<{
        fryStationItemId: string;
        quantityDelta: number;
        revertable?: boolean;
      }>,
    ) => {
      const { fryStationItemId, quantityDelta, revertable = true } = action.payload;

      if (revertable) {
        state.completionHistory.push([{ ...action.payload, timestamp: new Date().toISOString() }]);
      }

      if (!state.completedQuantities[fryStationItemId]) {
        state.completedQuantities[fryStationItemId] = 0;
      }

      state.completedQuantities[fryStationItemId] += quantityDelta;
    },

    resetCompletedQuantities: (state) => {
      state.completionHistory = [];
      state.completedQuantities = {};
    },
    revertLastHistory: (state) => {
      const lastHistoryChange = state.completionHistory.pop();

      if (lastHistoryChange) {
        lastHistoryChange.forEach(({ quantityDelta, fryStationItemId }) => {
          if (!state.completedQuantities[fryStationItemId]) {
            state.completedQuantities[fryStationItemId] = 0;
          }

          state.completedQuantities[fryStationItemId] += -quantityDelta;
        });
      }
    },
  },
});

export const fryStationMonitoringReducer = persistReducer(
  {
    key: 'rtk:fryStationMonitoring',
    storage,
    whitelist: ['completionHistory', 'completedQuantities'],
  },
  fryStationMonitoringSlice.reducer,
);

export const {
  recordCompletedFryItemQuantityChange,
  resetCompletedQuantities,
  revertLastHistory,
} = fryStationMonitoringSlice.actions;
