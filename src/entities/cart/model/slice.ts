import { toast } from "react-toastify"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
	calculateMenuTotal,
	calculateMenuTotalWithQuantity,
} from "@shared/lib/calculate-menu-total"

import { generateUniqueKey } from "../lib/generate-unique-key"
import { CartState, MenuItem } from "./types"

const initialState: CartState = {
	cart: [],
	menuItemsTotal: 0,
	orderTotal: 0,
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, { payload }: PayloadAction<MenuItem>) => {
			const menuItem = payload

			const menuItemKey = generateUniqueKey(menuItem)

			const findMenuItem = state.cart.findIndex(
				(menuItem) => generateUniqueKey(menuItem) === menuItemKey,
			)

			if (findMenuItem !== -1) {
				state.cart[findMenuItem].quantity += menuItem.quantity
			} else {
				state.cart = [...state.cart, menuItem]
			}

			const menuTotalPrice = calculateMenuTotalWithQuantity(menuItem)

			state.menuItemsTotal += menuTotalPrice

			toast.success("Блюдо добавлена в корзину")
		},

		decreaseMenuQuantity: (state, { payload }: PayloadAction<MenuItem>) => {
			const menuItem = state.cart.find(
				(menuItem) =>
					generateUniqueKey(menuItem) === generateUniqueKey(payload),
			)

			if (!menuItem) {
				return
			}

			if (menuItem.quantity === 1) {
				state.cart = state.cart.filter(
					(menu) => generateUniqueKey(menu) !== generateUniqueKey(payload),
				)

				state.menuItemsTotal -= calculateMenuTotal(menuItem)
			}

			state.cart = state.cart.map((menu) => {
				if (generateUniqueKey(menu) === generateUniqueKey(payload)) {
					menu.quantity--

					state.menuItemsTotal -= calculateMenuTotal(menuItem)

					return menu
				}
				return menu
			})
		},

		increaseMenuQuantity: (state, { payload }: PayloadAction<MenuItem>) => {
			state.cart = state.cart.map((menu) => {
				if (generateUniqueKey(menu) === generateUniqueKey(payload)) {
					menu.quantity++

					state.menuItemsTotal += calculateMenuTotal(menu)

					return menu
				}
				return menu
			})
		},

		calculateOrderTotal: (state, { payload }: PayloadAction<number>) => {
			state.orderTotal = state.menuItemsTotal + payload
		},

		clearCart: (state) => {
			state.cart = []
			state.menuItemsTotal = 0
		},
	},
})

export const {
	addToCart,
	decreaseMenuQuantity,
	increaseMenuQuantity,
	clearCart,
	calculateOrderTotal,
} = cartSlice.actions

export default cartSlice.reducer
