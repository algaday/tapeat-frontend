"use client"

import AddBoxIcon from "@mui/icons-material/AddBox"

import { StyledIconButton } from "./add-to-cart.styles"

export function AddToCart() {
	const addMenuItemToCart = () => {
		// e.stopPropagation()
		console.log("click cart")
	}

	return (
		<StyledIconButton disableRipple onClick={addMenuItemToCart}>
			<AddBoxIcon color="info" sx={{ fontSize: "32px", padding: 0 }} />
		</StyledIconButton>
	)
}
