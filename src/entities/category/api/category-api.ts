import { baseApi, CATEGORY_TAG } from "@shared/api"

import {
	CategoryMenuItemsResponse,
	CreateCategoryDto,
	CreateCategoryResponse,
	DeleteCategoryDto,
} from "./types"

export const categoryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createCategory: build.mutation<CreateCategoryResponse, CreateCategoryDto>({
			query: (body) => ({
				url: "category",
				method: "POST",
				body,
			}),
			invalidatesTags: [CATEGORY_TAG],
		}),

		getCategories: build.query<CreateCategoryResponse[], void>({
			query: () => `category/all`,
			providesTags: [CATEGORY_TAG],
		}),

		getCategoryMenuItems: build.query<CategoryMenuItemsResponse, void>({
			query: () => `category/menu-items`,
		}),

		deleteCategory: build.mutation<CreateCategoryResponse, DeleteCategoryDto>({
			query: (query) => {
				return { url: `category/${query.id}`, method: "DELETE" }
			},
			invalidatesTags: [CATEGORY_TAG],
		}),
	}),
})

export const {
	useCreateCategoryMutation,
	useGetCategoriesQuery,
	useDeleteCategoryMutation,
	useGetCategoryMenuItemsQuery,
} = categoryApi
