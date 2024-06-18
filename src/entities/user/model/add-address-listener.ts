import type { TypedStartListening } from "@reduxjs/toolkit"

import { createListenerMiddleware } from "@reduxjs/toolkit"

import { addAddressAction } from "@shared/api"

import { addAddress } from "./slice"

export const addAddressListener = createListenerMiddleware()

export type TypedListening = TypedStartListening<RootState, AppDispatch>

export const startInvalidateAccessTokenListener =
	addAddressListener.startListening as TypedListening

startInvalidateAccessTokenListener({
	actionCreator: addAddressAction,
	effect: async (action, api) => {
		// In the future here may be logic with refresh access token
		// @see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors
		api.dispatch(addAddress(action.payload))
	},
})
