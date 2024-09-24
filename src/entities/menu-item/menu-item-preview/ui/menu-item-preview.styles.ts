import { Card } from "@mui/material"
import styled from "styled-components"

export const StyledCard = styled(Card)`
	&.MuiPaper-root {
		border-radius: 8px;
		box-shadow: none;
	}

	.MuiCardContent-root {
		padding: 0;
		padding: 10px 10px 0 10px;
	}

	.MuiCardActions-root {
		padding: 0 10px 10px 10px;
	}
`
