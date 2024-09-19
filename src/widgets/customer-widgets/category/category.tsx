"use client"

import { Box, Stack } from "@mui/material"

import { CategoryPreview, useGetCategoriesQuery } from "@entities/category"
import { CreateCategory, DeleteCategory } from "@features/customer/category"

export function CategoryWidget() {
	const { data } = useGetCategoriesQuery()

	return (
		<>
			<CreateCategory />

			<Box maxWidth="400px">
				{data?.map((category) => {
					const actions = () => {
						return (
							<Stack>
								<DeleteCategory id={category.id} />
							</Stack>
						)
					}

					return (
						<CategoryPreview
							name={category.name}
							key={category.id}
							actionSlot={actions()}
						/>
					)
				})}
			</Box>
		</>
	)
}
