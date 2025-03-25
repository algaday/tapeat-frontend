import { FryStationItem } from '@entities/fry-station-item';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

enum FryItemHistoryType {
  ADDITION = 'addition', // when food is cooked or counted in
  DISPOSAL = 'disposal', // thrown away
}

export type SubstitutionItem = {
  substituteItem: FryStationItem;
  quantityMultiplier: number;
};

type FryStationMonitoringState = {
  completionHistory: {
    fryStationItemId: string;
    quantityDelta: number;
    timestamp: string;
    substituteItemId: string | null;
    type: FryItemHistoryType;
  }[][];
  completedQuantities: Record<string, number>;
  substituteItemsById: Record<string, SubstitutionItem | null>;
};

const initialState: FryStationMonitoringState = {
  completionHistory: [],
  completedQuantities: {},
  substituteItemsById: {},
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
        revertible?: boolean;
        substituteItemId?: string | null;
      }>,
    ) => {
      const {
        fryStationItemId,
        quantityDelta,
        revertible = true,
        substituteItemId = null,
      } = action.payload;

      if (revertible) {
        state.completionHistory.push([
          {
            ...action.payload,
            timestamp: new Date().toISOString(),
            substituteItemId,
            type: quantityDelta < 0 ? FryItemHistoryType.DISPOSAL : FryItemHistoryType.ADDITION,
          },
        ]);
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

    setSubstituteItemById: (
      state,
      action: PayloadAction<{
        fryStationItemId: string;
        newSubstitution: SubstitutionItem | null;
      }>,
    ) => {
      state.substituteItemsById[action.payload.fryStationItemId] = action.payload.newSubstitution;
    },
  },
});

export const fryStationMonitoringReducer = persistReducer(
  {
    key: 'rtk:fryStationMonitoring',
    storage,
    whitelist: ['completionHistory', 'completedQuantities', 'substituteItemsById'],
  },
  fryStationMonitoringSlice.reducer,
);

export const { recordCompletedFryItemQuantityChange, resetCompletedQuantities, revertLastHistory, setSubstituteItemById } =
  fryStationMonitoringSlice.actions;
