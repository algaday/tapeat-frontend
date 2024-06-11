import AddIcon from "@mui/icons-material/Add"
import { Box, Button } from "@mui/material"
import Link from "next/link"

import { BranchCard, useGetBranchesQuery } from "@entities/restaurant-branch"

export function RestaurantBranchWidget() {
	const { data: branches } = useGetBranchesQuery()

	return (
		<>
			<Button
				variant="outlined"
				startIcon={<AddIcon />}
				href="/dashboard/branches/create-branch"
				LinkComponent={Link}
			>
				СОЗДАТЬ ФИЛИАЛ
			</Button>
			<Box marginTop={4}>
				<BranchCard branches={branches} />
			</Box>
		</>
	)
}
