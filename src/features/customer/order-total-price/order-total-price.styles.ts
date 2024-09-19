import { Box } from "@mui/material"
import styled from "styled-components"

export const StyledFixedBox = styled(Box)`
	&.MuiBox-root {
	}
	width: 100%;
	background-color: white;
	position: sticky;
	bottom: 0;
	right: 0;
	padding: 0 0 10px;
`
