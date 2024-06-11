import { createAsyncThunk } from "@reduxjs/toolkit"

import { mapApi } from "@shared/api"

export const fetchAddress = createAsyncThunk(
	"user/fetchAddress",
	async (address: string, thunkAPI) => {
		try {
			const response = await thunkAPI
				.dispatch(mapApi.endpoints.findAddress.initiate(address))
				.unwrap()

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	},
)
