import { toast } from "react-toastify"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { generateUniqueKey } from "../lib/generate-unique-key"
import { CartState, MenuItem } from "./types"

const initialState: CartState = {
	cart: [],
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
			}

			state.cart = state.cart.map((menu) => {
				if (generateUniqueKey(menu) === generateUniqueKey(payload)) {
					menu.quantity--

					return menu
				}
				return menu
			})
		},

		increaseMenuQuantity: (state, { payload }: PayloadAction<MenuItem>) => {
			state.cart = state.cart.map((menu) => {
				if (generateUniqueKey(menu) === generateUniqueKey(payload)) {
					menu.quantity++

					return menu
				}
				return menu
			})
		},

		clearCart: (state) => {
			state.cart = []
		},
	},
})

export const {
	addToCart,
	decreaseMenuQuantity,
	increaseMenuQuantity,
	clearCart,
} = cartSlice.actions

export default cartSlice.reducer
