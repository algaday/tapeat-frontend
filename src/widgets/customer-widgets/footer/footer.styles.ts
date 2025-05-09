import { Container, Typography } from "@mui/material"
import styled from "styled-components"

export const StyledContainer = styled(Container)`
	margin-top: 0;
	height: 60px;
	background-color: #000;
`
export const StyledTypography = styled(Typography)`
	color: white;

	&.MuiTypography-root {
		font-size: 14px;
	}
`
