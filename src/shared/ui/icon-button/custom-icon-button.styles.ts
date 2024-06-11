import { IconButton } from "@mui/material"
import styled from "styled-components"

export const StyledIconButton = styled(IconButton)<{
	fontSize: string
	customColor?: string
	bgColor?: string
}>((props) => {
	return {
		"&.MuiButtonBase-root": {
			padding: 0,
		},

		".MuiSvgIcon-root": {
			fontSize: props.fontSize,
			color: props.customColor ? props.customColor : "lightgray",
			backgroundColor: props.bgColor,
		},
	}
})
