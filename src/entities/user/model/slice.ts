import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { User } from "../api/type"
import { userApi } from "../api/user-api"
import { fetchAddress } from "./fetch-address-thunk"
import { fetchLocation } from "./fetch-location-thunk"

type UserState = {
	user: User | null
	address: string
	coordinate: number[]
}

const initialState: UserState = {
	user: null,
	address: "",
	coordinate: [71.430429, 51.128201],
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearUser: (state) => {
			state.user = null
			state.address = ""
			state.coordinate = []
		},
		addAddress: (state, { payload }: PayloadAction<string>) => {
			state.address = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAddress.fulfilled, (state, action) => {
				state.address =
					action.payload.response.GeoObjectCollection.featureMember[0].GeoObject.name
			})
			.addCase(fetchLocation.fulfilled, (state, action) => {
				const coordinate =
					action.payload.response.GeoObjectCollection.featureMember[0]
						.GeoObject["Point"].pos

				const modifiedCoordinate = coordinate
					.split(" ")
					.map((item) => Number(item))

				state.coordinate = modifiedCoordinate
			})
			.addMatcher(
				userApi.endpoints.login.matchFulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload
				},
			)
			.addMatcher(
				userApi.endpoints.registerOwner.matchFulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload
				},
			)
	},
})

// Action creators are generated for each case reducer function
export const { clearUser, addAddress } = userSlice.actions

export const userReducer = userSlice.reducer
