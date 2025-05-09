import { Button, Stack, Typography } from "@mui/material"

import { useAppSelector } from "@shared/lib/store"

import { StyledFixedBox } from "./order-total-price.styles"
import { Props } from "./types"

export function OrderTotalPrice(props: Props) {
	const { orderTotal } = useAppSelector((state) => state.cart)

	return (
		<StyledFixedBox paddingX={2}>
			<Stack direction="row" justifyContent="space-between" marginBottom={1}>
				<Typography variant="body1" fontWeight={600}>
					Итого
				</Typography>
				<Typography variant="body1" fontWeight={600}>
					{orderTotal} ₸
				</Typography>
			</Stack>
			<Button variant="contained" fullWidth onClick={props.onClick}>
				{props.buttonText}
			</Button>
		</StyledFixedBox>
	)
}
