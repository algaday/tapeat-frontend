import { Stack, Typography } from "@mui/material"
import Link from "next/link"
import styled from "styled-components"

export const StyledTypography = styled(Typography)`
	text-transform: capitalize;
	padding: 20px 20px 15px 9px;

	&.MuiTypography-root {
		font-size: 18px;
		font-weight: 600;
	}
`

export const CategoryText = styled(Typography)<{ active?: boolean }>`
	text-transform: capitalize;
	padding: 5px 9px;
	border-radius: 5px;
	background-color: ${(props) => (props.active ? "#ebebeb" : "")};

	&.MuiTypography-root {
		font-size: 16px;
		font-weight: ${(props) => (props.active ? "600" : "500")};
	}
`

export const StyledStack = styled(Stack)`
	position: sticky;
	top: 50px;
	width: 100%;
	z-index: 999;
	background-color: rgba(255, 255, 255, 0.97);
	padding: 5px 0;
	flex-wrap: nowrap;
	-ms-overflow-style: none;
	scrollbar-width: none;
	overflow-x: scroll;
	backdrop-filter: blur(5px);

	&::-webkit-scrollbar {
		display: none;
	}
`

export const StyledLink = styled(Link)`
	color: black;
	text-decoration: none;
`
