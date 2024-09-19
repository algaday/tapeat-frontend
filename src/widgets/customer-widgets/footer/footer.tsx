"use client"

import { Stack } from "@mui/material"

import { StyledContainer, StyledTypography } from "./footer.styles"

export function Footer() {
	return (
		<StyledContainer>
			<Stack alignItems="center" width="100%">
				<StyledTypography>FRITO FOOTER</StyledTypography>
			</Stack>
		</StyledContainer>
	)
}
