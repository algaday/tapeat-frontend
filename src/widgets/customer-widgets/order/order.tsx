"use client"

import { useEffect } from "react"

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import { Container, IconButton, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

import { OrderForm } from "@features/customer/order-form"
import { useAppSelector } from "@shared/lib/store"

export function OrderWidget() {
	const router = useRouter()
	const { cart } = useAppSelector((state) => state.cart)

	const handleBackArrowClick = () => {
		router.push("/frito/cart")
	}

	useEffect(() => {
		console.log(cart)
		if (cart.length === 0) {
			router.push("/frito")
		}
	}, [])

	return (
		<Container sx={{ height: "100%", width: "100%" }}>
			<Stack height="100%" alignItems="center" flexDirection="column">
				<Stack
					direction="row"
					paddingY={1}
					width="100%"
					alignItems="center"
					justifyContent="space-between"
				>
					<IconButton onClick={handleBackArrowClick}>
						<KeyboardBackspaceOutlinedIcon />
					</IconButton>
					<Typography margin={0} variant="h5">
						Доставка
					</Typography>
					<div></div>
				</Stack>
				<OrderForm />
			</Stack>
		</Container>
	)
}
