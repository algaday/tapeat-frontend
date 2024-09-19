import { Stack } from "@mui/material"
import styled from "styled-components"

export const StyledStack = styled(Stack)`
	&.MuiStack-root {
		position: fixed;
		top: 0;
		left: 0;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		background-color: white;
		width: 100%;
		z-index: 1000;
		padding: 10px 16px;
		height: 50px;
	}
`
