import { Box } from "@mui/system"
import styled from "styled-components"

export const StyledModalBox = styled(Box)({
	minWidth: "500px",
	backgroundColor: "white",
	position: "absolute",
	top: "10%",
	left: "35%",
	boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
	padding: "30px 20px",
	textAlign: "center",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
})
