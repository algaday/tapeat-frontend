"use client"

import { Button, CardContent, Stack, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

import { StyledCard } from "./menu-item-card.styles"

type Image = {
	mediumThumbnailPath: string
	originalPath: string
	smallThumbnailPath: string
}

type Category = {
	id: string
	name: string
	restaurantId: string
}

type Props = {
	id: string
	category: Category
	description: string
	nameOfDish: string
	price: string
	restaurantId: string
	image: Image
}

export function MenuItemCard(props: Props) {
	const {
		id,
		category,
		description,
		nameOfDish,
		price,
		image: { mediumThumbnailPath },
	} = props
	return (
		<StyledCard>
			<div className="card-image">
				<Image
					src={`https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket/${mediumThumbnailPath}`}
					alt={nameOfDish}
					width={150}
					height={150}
					className="image"
				/>
			</div>
			<CardContent className="card-content" sx={{ width: "100%" }}>
				<Stack>
					<Typography variant="h6">Названия: {nameOfDish}</Typography>
					<Typography variant="caption">Категория: {category.name}</Typography>
					<Typography variant="body1" noWrap>
						Описание: {description}
					</Typography>
					<Typography variant="overline">Цена: {price} тенге</Typography>
					<Button
						variant="outlined"
						href={`/dashboard/menu/${id}`}
						LinkComponent={Link}
						fullWidth
					>
						Подробнее
					</Button>
				</Stack>
			</CardContent>
		</StyledCard>
	)
}
