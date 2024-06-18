import { TabList, TabPanel } from "@mui/lab"
import { Box } from "@mui/material"
import styled from "styled-components"

export const StyledTabPanel = styled(TabPanel)`
	&.MuiTabPanel-root {
		padding: 0;
	}
`

export const StyledTabList = styled(TabList)``

export const StyledBox = styled(Box)`
	height: 100svh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`

export const StyledPickupBox = styled(Box)`
	&.MuiBox-root {
		width: 100%;
		position: absolute;
		bottom: 0;
		padding: 0px 20px 20px;
		background-color: white;
	}
`
