import { FormControl } from "@mui/material"
import styled from "styled-components"

export const StyledFormControl = styled(FormControl)<{
	highlight?: boolean
}>`
	&.MuiFormControl-root {
		margin-top: 10px;
		display: block;
	}

	.MuiFormLabel-root {
		color: ${(props) => (props.highlight ? "red" : "rgba(0, 0, 0, 0.6)")};
	}
`
