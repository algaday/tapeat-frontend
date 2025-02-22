import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type FryStationMonitoringState = {
  completionHistory: { fryStationItemId: string; quantityDelta: number }[][];
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
    incrementCompletedFryStationItemQuantity: (
      state,
      action: PayloadAction<{ fryStationItemId: string; quantityDelta: number }>,
    ) => {
      const { fryStationItemId, quantityDelta } = action.payload;

      state.completionHistory.push([action.payload]);

      if (!state.completedQuantities[fryStationItemId]) {
        state.completedQuantities[fryStationItemId] = 0;
      }

      state.completedQuantities[fryStationItemId] += quantityDelta;
    },
    resetCompletedQuantities: (state) => {
      const historyChange = Object.entries(state.completedQuantities).map(
        ([fryStationItemId, quantity]) => ({
          fryStationItemId,
          quantityDelta: -quantity,
        }),
      );

      state.completionHistory.push(historyChange);
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

export const { incrementCompletedFryStationItemQuantity } = fryStationMonitoringSlice.actions;
