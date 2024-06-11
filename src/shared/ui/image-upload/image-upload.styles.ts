import { Typography } from "@mui/material"
import styled from "styled-components"

type Props = {
	warning: boolean
}

export const StyledFileInput = styled.input`
	clip: "rect(0 0 0 0)";
	clip-path: "inset(50%)";
	height: 1;
	overflow: "hidden";
	position: "absolute";
	bottom: 0;
	left: 0;
	white-space: "nowrap";
	width: 1;
	display: none;
`

export const StyledTypography = styled(Typography)<Props>(({ warning }) => {
	return `color: ${warning ? "red" : "black"}`
})
