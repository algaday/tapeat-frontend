import { createAsyncThunk } from "@reduxjs/toolkit"

import { mapApi } from "@shared/api"

export const fetchLocation = createAsyncThunk(
	"user/fetchLocation",
	async (uri: string, thunkAPI) => {
		try {
			const response = await thunkAPI
				.dispatch(mapApi.endpoints.findLocation.initiate(uri))
				.unwrap()

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	},
)
