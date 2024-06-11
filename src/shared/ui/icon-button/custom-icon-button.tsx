import { StyledIconButton } from "./custom-icon-button.styles"
import { Props } from "./types"

export function CustomIconButton(props: Props) {
	return <StyledIconButton {...props}>{props.children}</StyledIconButton>
}
