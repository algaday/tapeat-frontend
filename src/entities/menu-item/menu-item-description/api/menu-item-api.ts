import { baseApi, MENU_ITEMS_TAG } from "@shared/api"

import { MenuItemSchema } from "./types"

export const menuItemApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getMenuItem: build.query<MenuItemSchema, string>({
			query: (id) => {
				return `/menu/menu-item-info/${id}`
			},
			providesTags: [MENU_ITEMS_TAG],
		}),
	}),
})

export const { useGetMenuItemQuery } = menuItemApi
