import {
	ExtendButtonBase,
	ListItemButton,
	ListItemButtonTypeMap,
} from "@mui/material"
import styled from "styled-components"

export const Wrapper = styled.div`
	background-color: yellow;
	width: 240px;
	.avatar-container {
		width: auto;
		display: flex;
		gap: 10px;
		align-items: center;
		padding: 20px 0 10px 15px;
	}
`

export const StyledListItemButton: ExtendButtonBase<ListItemButtonTypeMap> = styled(
	ListItemButton,
)`
	&.MuiButtonBase-root {
		padding: 10px 0px 10px 30px;
	}
`
