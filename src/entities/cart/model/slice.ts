import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  calculateMenuTotal,
  calculateMenuTotalWithQuantity,
} from '@shared/lib/calculate-menu-total';

import { CartState, MenuItem } from './types';
import { generateUniqueKey } from '../lib/generate-unique-key';

const initialState: CartState = {
  cart: [],
  menuItemsTotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<MenuItem>) => {
      const menuItem = payload;

      const menuItemKey = generateUniqueKey(menuItem);

      const findMenuItem = state.cart.findIndex((item) => generateUniqueKey(item) === menuItemKey);

      if (findMenuItem !== -1) {
        state.cart[findMenuItem].quantity += menuItem.quantity;
      } else {
        state.cart = [...state.cart, menuItem];
      }

      const menuTotalPrice = calculateMenuTotalWithQuantity(menuItem);

      state.menuItemsTotal += menuTotalPrice;

      toast.success('Блюдо добавлена в корзину');
    },

    decreaseMenuQuantity: (state, { payload }: PayloadAction<MenuItem>) => {
      const menuItem = state.cart.find(
        (item) => generateUniqueKey(item) === generateUniqueKey(payload),
      );

      if (!menuItem) {
        return;
      }

      if (menuItem.quantity === 1) {
        state.cart = state.cart.filter(
          (menu) => generateUniqueKey(menu) !== generateUniqueKey(payload),
        );

        state.menuItemsTotal -= calculateMenuTotal(menuItem);
      }

      state.cart = state.cart.map((menu) => {
        if (generateUniqueKey(menu) === generateUniqueKey(payload)) {
          menu.quantity--;

          state.menuItemsTotal -= calculateMenuTotal(menuItem);

          return menu;
        }
        return menu;
      });
    },

    increaseMenuQuantity: (state, { payload }: PayloadAction<MenuItem>) => {
      state.cart = state.cart.map((menu) => {
        if (generateUniqueKey(menu) === generateUniqueKey(payload)) {
          menu.quantity++;

          state.menuItemsTotal += calculateMenuTotal(menu);

          return menu;
        }
        return menu;
      });
    },

    clearCart: (state) => {
      state.cart = [];
      state.menuItemsTotal = 0;
    },
  },
});

export const { addToCart, decreaseMenuQuantity, increaseMenuQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
