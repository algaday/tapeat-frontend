import LocationOnIcon from "@mui/icons-material/LocationOn"
import { Box, IconButton } from "@mui/material"
import { Stack } from "@mui/system"
import styled from "styled-components"

export const StyledStack = styled(Stack)({
	width: "100%",
	height: "60vh",
})

export const Wrapper = styled(Box)({
	width: "100%",
	height: "60vh",
	position: "relative",
})

export const StyledIconButton = styled(IconButton)({
	"&.MuiButtonBase-root": {
		position: "absolute",
		zIndex: "999",
		top: "45%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
})

export const StyledIcon = styled(LocationOnIcon)({
	"&.MuiSvgIcon-root": {
		color: "red",
		fontSize: "50px",
	},
})
