import { Paper, Typography } from "@mui/material"
import styled from "styled-components"

export const StyledPaper = styled(Paper)`
	margin: 30px 0;
	padding: 2px 4px;
	display: flex;
	align-items: center;
	width: 400px;
	position: relative;
`
export const ErrorText = styled(Typography)`
	position: absolute;
	bottom: -60%;
`
