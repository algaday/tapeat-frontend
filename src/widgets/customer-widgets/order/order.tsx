"use client"

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import { Box, Container, IconButton, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

import { OrderForm } from "@features/customer/order-form"

export function OrderWidget() {
	const router = useRouter()

	const handleBackArrowClick = () => {
		router.push("/frito/cart")
	}

	return (
		<Container sx={{ height: "100%" }}>
			<Stack
				height="100%"
				justifyContent="space-between"
				flexDirection="column"
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					paddingY={1}
					alignItems="center"
				>
					<IconButton onClick={handleBackArrowClick}>
						<KeyboardBackspaceOutlinedIcon />
					</IconButton>

					<Typography margin={0} variant="h6">
						Доставка
					</Typography>
					<Box></Box>
				</Stack>
				<OrderForm />
			</Stack>
		</Container>
	)
}
