import { TabPanel } from "@mui/lab"
import { Box, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material"
import styled from "styled-components"

export const StyledTabPanel = styled(TabPanel)`
	&.MuiTabPanel-root {
		padding: 0;
	}
`

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

export const StyledIconButton = styled(IconButton)`
	&.MuiIconButton-root {
		width: auto;
		position: absolute;
		bottom: 5%;
		background-color: white;
		margin-left: 10px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

		&:hover {
			background-color: white;
		}
	}
`

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
	&.MuiToggleButtonGroup-root {
		background-color: #f4f3ef;
		border-radius: 10px;
		border: none;
	}
`
export const StyledToggleButton = styled(ToggleButton)`
	&.MuiButtonBase-root {
		border: none;
		color: black;
		font-size: 16px;
		font-weight: 500;
		text-transform: capitalize;
		padding: 6px;

		&.Mui-selected {
			background-color: #3d3d3d;
			color: white;
			border-radius: 10px;
			margin: 3px;

			&:hover {
				background-color: #3d3d3d;
				color: white;
			}
		}
	}
`
