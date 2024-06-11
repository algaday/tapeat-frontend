"use client"

import { Box, Stack, Typography } from "@mui/material"

import {
	StyledCard,
	StyledCardContent,
	StyledImage,
} from "./menu-item-cart-preview.styles"
import { Props } from "./types"

export function MenuItemCartPreview(props: Props) {
	const { nameOfDish, image, description, actionSlot } = props
	return (
		<StyledCard>
			<Stack direction="row">
				<Box padding={1}>
					<StyledImage
						src={`https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket${image}`}
						height="100"
						width="100"
						alt="smth"
					/>
				</Box>
				<StyledCardContent>
					<Box>
						<Typography variant="h6">{nameOfDish} </Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							lineHeight={1}
						>
							{description}
						</Typography>
					</Box>
					{actionSlot}
				</StyledCardContent>
			</Stack>
		</StyledCard>
	)
}
