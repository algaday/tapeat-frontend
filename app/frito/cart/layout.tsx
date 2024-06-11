import { Stack } from "@mui/material"

import { CartHeader } from "@widgets/cart-header/cart-header"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<CartHeader />
			<Stack paddingX={2} paddingY={3}>
				{children}
			</Stack>
		</>
	)
}
