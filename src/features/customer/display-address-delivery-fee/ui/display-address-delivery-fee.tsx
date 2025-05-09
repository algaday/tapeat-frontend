import { useEffect } from "react"

import { Box, Stack, Typography } from "@mui/material"

import { calculateOrderTotal } from "@entities/cart"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

import { useGetDeliveryFeesQuery } from "../api/delivery-fee"
import { displayDeliveryFeeText } from "../lib/display-delivery-fee"

export function DisplayAddressDeliveryFee() {
	const { data } = useGetDeliveryFeesQuery()

	const dispatch = useAppDispatch()

	const totalPrice = useAppSelector((state) => state.cart.menuItemsTotal)

	const address = useAppSelector((state) => state.user.address?.street)

	const deliveryFeeTemplate = data?.findLast((deliveryFee) => {
		return Number(deliveryFee.minOrderAmount) < totalPrice
	})

	useEffect(() => {
		const fee = Number(deliveryFeeTemplate?.deliveryFee)

		dispatch(calculateOrderTotal(fee))
	}, [deliveryFeeTemplate?.deliveryFee, totalPrice])

	const deliveryFeeText = displayDeliveryFeeText(data)

	return (
		<Stack marginY={3} direction="row" justifyContent="space-between">
			<Box>
				<Typography variant="body1" fontWeight="600">
					Доставка по адресу
				</Typography>
				<Typography variant="body1" fontWeight="500">
					{address}
				</Typography>

				<Typography variant="body2" color="GrayText" marginTop={1}>
					{deliveryFeeText}
				</Typography>
			</Box>
			<Typography variant="body1" fontWeight="600" noWrap overflow="unset">
				{deliveryFeeTemplate?.deliveryFee} ₸
			</Typography>
		</Stack>
	)
}
