import { Box, Button, CardActions, Chip, Typography } from "@mui/material"
import Link from "next/link"

import {
	StyledActionBox,
	StyledCard,
	StyledCardContent,
} from "./modification-card.styles"

type Props = {
	id: string
	name: string
	price: string
	createdAt: string
	updatedAt: string
} & { modificationCount: number }

export function ModificationCard(props: Props) {
	return (
		<StyledCard>
			<Box padding={0}>
				<StyledCardContent>
					<Typography variant="h5">{props.name}</Typography>
				</StyledCardContent>
			</Box>
			<StyledActionBox>
				<Chip label={props.modificationCount} variant="outlined" />
				<CardActions>
					<Button
						variant="outlined"
						href={`/dashboard/menu/modification-group/${props.id}`}
						LinkComponent={Link}
					>
						Подробнее
					</Button>
				</CardActions>
			</StyledActionBox>
		</StyledCard>
	)
}
