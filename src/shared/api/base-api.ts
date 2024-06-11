import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQuery } from "./base-query"
import {
	MENU_ITEMS_TAG,
	MODIFICATION_GROUP_TAG,
	RESTAURANT_BRANCH_TAG,
	USER_TAG,
} from "./tags"

export const baseApi = createApi({
	tagTypes: [
		USER_TAG,
		RESTAURANT_BRANCH_TAG,
		MENU_ITEMS_TAG,
		MODIFICATION_GROUP_TAG,
	],
	reducerPath: "api",
	baseQuery,
	endpoints: () => ({}),
})
