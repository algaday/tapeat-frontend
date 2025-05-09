import { Container, Typography } from "@mui/material"
import styled from "styled-components"

export const StyledContainer = styled(Container)`
	margin-top: 100px;
	height: 500px;
	background-color: #000;
`
export const StyledTypography = styled(Typography)`
	color: white;

	&.MuiTypography-root {
		font-size: 40px;
	}
`
