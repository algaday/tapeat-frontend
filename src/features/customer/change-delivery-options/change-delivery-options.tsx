"use client"

import { useRouter } from "next/navigation"

import { updateDeliveryOption } from "@entities/user"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

import {
	StyledToggleButton,
	StyledToggleButtonGroup,
} from "./change-delivery-optioins.styles"

export function ChangeDeliveryOptions() {
	const deliveryType = useAppSelector((state) => state.user.address?.type)

	const dispatch = useAppDispatch()

	const router = useRouter()

	const handleClick = (event: React.SyntheticEvent<HTMLElement>) => {
		dispatch(updateDeliveryOption(event.target.value))

		router.push("/frito/map")
	}

	return (
		<StyledToggleButtonGroup
			value={deliveryType}
			exclusive
			fullWidth
			onClick={handleClick}
		>
			<StyledToggleButton value="delivery">Доставка</StyledToggleButton>
			<StyledToggleButton value="pick-up">Самовывоз</StyledToggleButton>
			<StyledToggleButton value="restaurant">В заведении</StyledToggleButton>
		</StyledToggleButtonGroup>
	)
}
