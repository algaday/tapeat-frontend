import { Box } from "@mui/material"

import { CartHeader } from "@widgets/cart-header"
import { CartWidget } from "@widgets/customer-widgets"

export function CartPage() {
	return (
		<Box position="relative" height={"100%"}>
			<CartHeader />
			<CartWidget />
		</Box>
	)
}
