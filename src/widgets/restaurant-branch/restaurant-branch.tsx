import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

import { BranchCard, useGetBranchesQuery } from '@entities/restaurant-branch'

import RestaurantBranchSuggestion from './restaurant-branch-suggestion'

export function RestaurantBranchWidget() {
	const { data: branches } = useGetBranchesQuery()

	return (
		<>
			<RestaurantBranchSuggestion />
			<Box marginTop={4}>
				<BranchCard branches={branches} />
			</Box>
		</>
	)
}
