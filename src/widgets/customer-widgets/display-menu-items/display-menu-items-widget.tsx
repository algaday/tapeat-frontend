"use client"

import { CircularProgress, Grid, Typography } from "@mui/material"

import { MenuItemPreview } from "@entities/menu-item/menu-item-preview"
import { useGetAllMenuItemsQuery } from "@entities/menu-item/menu-items"
import { AddToCart } from "@features/customer/add-to-cart/"

export function DisplayMenuItemsWidget() {
	const { data: menuItems, isError, isLoading } = useGetAllMenuItemsQuery()

	if (isError) {
		return <Typography>There was an error</Typography>
	}

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<Grid container spacing={2} marginY={2}>
			{menuItems?.map((menuItem) => {
				return (
					<Grid item xs={6} key={menuItem.id}>
						<MenuItemPreview
							id={menuItem.id}
							actionSlot={<AddToCart />}
							image={menuItem.image.mediumThumbnailPath}
							name={menuItem.nameOfDish}
							price={menuItem.price}
						/>
					</Grid>
				)
			})}
		</Grid>
	)
}
