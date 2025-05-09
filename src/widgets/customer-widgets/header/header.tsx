"use client"

import { Search } from "@mui/icons-material"
import { Typography } from "@mui/material"

import { Navigation } from "@features/customer/navigation"

import { StyledStack } from "./header.styles"

export function HeaderWidget() {
	return (
		<StyledStack>
			<Navigation />
			<Typography margin={0} variant="h6">
				Frito
			</Typography>
			<Search />
		</StyledStack>
	)
}
