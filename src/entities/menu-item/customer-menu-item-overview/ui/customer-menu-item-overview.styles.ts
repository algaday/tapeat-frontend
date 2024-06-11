import { Box, IconButton } from "@mui/material"
import styled from "styled-components"

export const StyledIconButton = styled(IconButton)({
	"&.MuiIconButton-root": {
		position: "absolute",
		margin: "8px",
		right: 0,
		zIndex: 999,
	},
})

export const StyledImageBox = styled(Box)({
	"&.MuiBox-root": {
		position: "relative",
		paddingBottom: "70%",
	},
})

export const StyledBox = styled(Box)({
	"&.MuiBox-root": {
		paddingBottom: "50px",
	},
})
