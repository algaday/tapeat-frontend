"use client"

import {
	CardActions,
	CardContent,
	CardMedia,
	Stack,
	Typography,
} from "@mui/material"
import { useRouter } from "next/navigation"

import { StyledCard } from "./menu-item-preview.styles"

type Props = {
	readonly actionSlot: JSX.Element
	image: string
	name: string
	price: string
	id: string
}

export function MenuItemPreview(props: Props) {
	const LINK_TO_MENU_ITEM_OVERVIEW = `/frito/${props.id}`

	const router = useRouter()

	const handleOnCardClick = () => {
		router.push(LINK_TO_MENU_ITEM_OVERVIEW)
	}

	return (
		<StyledCard onClick={handleOnCardClick}>
			<CardMedia
				component="img"
				image={`https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket/${props.image}`}
				alt={props.name}
			/>

			<CardContent>
				<Typography variant="h6" fontSize="16px">
					{props.name}
				</Typography>
			</CardContent>

			<CardActions>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					width="100%"
				>
					<Typography variant="body1" fontSize="16px" fontWeight="600">
						{props.price} ₸
					</Typography>

					{props.actionSlot}
				</Stack>
			</CardActions>
		</StyledCard>
	)
}
