"use client"

import { useState } from "react"
import { InView, useInView } from "react-intersection-observer"

import { Box, CircularProgress, Grid, Typography } from "@mui/material"

import {
	useGetCategoriesQuery,
	useGetCategoryMenuItemsQuery,
} from "@entities/category"
import { MenuItemPreview } from "@entities/menu-item/menu-item-preview"
import { AddToCart } from "@features/customer/add-to-cart/"

import {
	CategoryText,
	StyledLink,
	StyledStack,
	StyledTypography,
} from "./display-menu-items-widget.styles"

export function DisplayMenuItemsWidget() {
	const {
		data: categoryMenuItems,
		isError,
		isLoading,
	} = useGetCategoryMenuItemsQuery()

	const { data: categories } = useGetCategoriesQuery()

	const { ref } = useInView()

	const [visibleSection, setVisibleSection] = useState(
		categories ? categories[0] : "",
	)

	const setInView = (inView, entry) => {
		if (inView) {
			setVisibleSection(entry.target.getAttribute("id"))
		}
	}

	if (isError) {
		return <Typography>There was an error</Typography>
	}

	if (isLoading) {
		return <CircularProgress />
	}

	if (!categoryMenuItems || !categories) {
		return <Typography>There was an error</Typography>
	}

	return (
		<>
			<StyledStack direction="row" marginY={1} paddingX={2}>
				{categories.map((category) => {
					return (
						<StyledLink href={`#${category.id}`} key={category.id}>
							<CategoryText
								key={category.id}
								active={category.id === visibleSection}
							>
								{category.name}
							</CategoryText>
						</StyledLink>
					)
				})}
			</StyledStack>
			<Box ref={ref} sx={{ backgroundColor: "#F1F1F1", padding: "10px 0" }}>
				{categoryMenuItems.map((category, index) => (
					<InView
						onChange={setInView}
						threshold={0}
						key={category.id}
						rootMargin="0px 0px -100% 0px"
					>
						{({ ref }) => {
							if (category.menuItems.length === 0) {
								return
							}

							return (
								<Box key={category.id} id={category.id} ref={ref} marginX={2}>
									{index === 0 ? (
										""
									) : (
										<StyledTypography>{category.name}</StyledTypography>
									)}
									<Grid container spacing={2}>
										{category.menuItems.map((menuItem) => {
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
								</Box>
							)
						}}
					</InView>
				))}
			</Box>
		</>
	)
}
