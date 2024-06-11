import { Search } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"

import { Navigation } from "@features/customer/navigation"

export function HeaderWidget() {
	return (
		<Stack
			direction={"row"}
			justifyContent="space-between"
			alignItems="center"
			paddingX={2}
			paddingY={1}
		>
			<Navigation />
			<Typography margin={0} variant="h6">
				Frito
			</Typography>
			<Search />
		</Stack>
	)
}
