import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded"
import { Stack } from "@mui/material"
import styled from "styled-components"

export const StyledStack = styled(Stack)({
	paddingTop: "30px",
	alignItems: "center",
})

export const StyledIcon = styled(ShoppingCartRoundedIcon)({
	"&.MuiSvgIcon-root": {
		fontSize: "100px",
	},
})
