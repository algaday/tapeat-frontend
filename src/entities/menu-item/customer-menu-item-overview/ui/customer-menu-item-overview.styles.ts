import { Box, IconButton, Stack } from "@mui/material"
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

export const StyledBox = styled(Box)`
	&.MuiBox-root {
		padding: 10px 21px 10px;
	}
`

export const FormWrapper = styled.form`
	display: block;
	padding-bottom: 60px;
`

export const StyledStack = styled(Stack)({
	padding: "10px 10px",
	bottom: "0",
	left: "0",
	width: "100%",
	position: "fixed",
	backgroundColor: "white",
	zIndex: 999,
})
