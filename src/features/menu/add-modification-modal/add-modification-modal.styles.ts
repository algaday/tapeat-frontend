import { Box } from "@mui/material"
import styled from "styled-components"

export const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	margin: 30px auto;
	width: 100%;
	max-width: 500px;
	background: white;
	border-radius: 4px;
	box-shadow:
		rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
		rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
	padding: 30px 50px;
`

export const StyledBox = styled(Box)({
	position: "absolute",
	top: "10%",
	left: "35%",
	textAlign: "center",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
})
