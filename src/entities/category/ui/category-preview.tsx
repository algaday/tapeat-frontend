import { Typography } from "@mui/material"

import { StyledCard } from "./category-preview.styles"
import { Props } from "./types"

export function CategoryPreview(props: Props) {
	return (
		<StyledCard>
			<Typography component="div" variant="h6">
				{props.name}
			</Typography>
			{props.actionSlot}
		</StyledCard>
	)
}
