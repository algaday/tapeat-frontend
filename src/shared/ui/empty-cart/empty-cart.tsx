import { Button, Typography } from "@mui/material"
import Link from "next/link"

import { StyledIcon, StyledStack } from "./empty-cart.styles"

export function EmptyCart() {
	return (
		<StyledStack gap={2}>
			<StyledIcon />
			<Typography variant="h5">Корзина пуста</Typography>
			<Typography variant="body1">
				Перейдите в наше меню, чтобы выбрать заказ
			</Typography>
			<Button variant="contained" href={`/frito`} LinkComponent={Link}>
				Перейти в меню
			</Button>
		</StyledStack>
	)
}
