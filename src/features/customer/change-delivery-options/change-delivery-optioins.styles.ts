import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import styled from "styled-components"

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
