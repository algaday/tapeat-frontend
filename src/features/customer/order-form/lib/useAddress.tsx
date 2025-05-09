import { Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

import { useAppSelector } from "@shared/lib/store"

export function useAddress() {
	const address = useAppSelector((state) => state.user.address)

	const totalOrderAmount = useAppSelector((state) => state.cart.orderTotal)

	const router = useRouter()

	const totalAmount = () => {
		return (
			<Stack direction="row" justifyContent="space-between" marginBottom={1}>
				<Typography variant="body1" fontWeight={600}>
					Итого
				</Typography>
				<Typography variant="body1" fontWeight={600}>
					{totalOrderAmount} ₸
				</Typography>
			</Stack>
		)
	}

	let fullAddress

	if (!address) {
		router.push("/frito")
	}

	if (address?.type === "delivery") {
		fullAddress = `${address?.street}, квартира ${address?.flat}, подъезд ${address?.entrance}, этаж ${address?.floor}`
	} else {
		fullAddress = `${address?.street}`
	}

	return { fullAddress, totalAmount }
}
