import { createAction } from "@reduxjs/toolkit"

export type Address = {
	coordinates: string
	street: string
	flat?: string
	floor?: string
	entrance?: string
	type: "delivery" | "pick-up" | "restaurant"
}

export const addAddressAction = createAction(
	"user/addAddress",
	(obj: Address) => {
		return { payload: obj }
	},
)
