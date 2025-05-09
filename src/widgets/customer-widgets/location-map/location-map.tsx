"use client"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { TabContext } from "@mui/lab"
import { Box, Button, Stack } from "@mui/material"
import { useRouter } from "next/navigation"

import { updateDeliveryOption } from "@entities/user"
import { DeliveryAddressForm } from "@features/map/delivery-address"
import { DisplayLocationMap } from "@features/map/display-map"
import { SelectPickup } from "@features/map/select-pickup"
import { useCoordinatesControl } from "@shared/hooks"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

import {
	StyledBox,
	StyledIconButton,
	StyledPickupBox,
	StyledTabPanel,
	StyledToggleButton,
	StyledToggleButtonGroup,
} from "./location-map.styles"

type DeliveryVariants = "delivery" | "pick-up" | "restaurant"

export function LocationMap() {
	const tabType = useAppSelector((state) => state.user.deliveryOption)

	const router = useRouter()

	const dispatch = useAppDispatch()

	const { updateDeliveryType, submitPickupAddress } = useCoordinatesControl()

	const handleChange = (event: React.SyntheticEvent, tab: DeliveryVariants) => {
		if (tab) {
			dispatch(updateDeliveryOption(tab))
			updateDeliveryType(tab)
		}
	}

	return (
		<StyledBox>
			<Box flex="1" position="relative">
				<DisplayLocationMap />
				<StyledIconButton onClick={() => router.back()}>
					<ArrowBackIcon />
				</StyledIconButton>
			</Box>

			<TabContext value={tabType}>
				<Stack marginX={2} marginTop={2}>
					<StyledToggleButtonGroup
						onChange={handleChange}
						value={tabType}
						exclusive
						fullWidth
					>
						<StyledToggleButton value="delivery">Доставка</StyledToggleButton>
						<StyledToggleButton value="pick-up">Самовывоз</StyledToggleButton>
						<StyledToggleButton value="restaurant">
							В заведении
						</StyledToggleButton>
					</StyledToggleButtonGroup>
				</Stack>

				<StyledTabPanel value="delivery">
					<DeliveryAddressForm />
				</StyledTabPanel>

				<StyledTabPanel value="pick-up">
					<SelectPickup />
					<StyledPickupBox>
						<Button variant="contained" fullWidth onClick={submitPickupAddress}>
							Готово
						</Button>
					</StyledPickupBox>
				</StyledTabPanel>

				<StyledTabPanel value="restaurant">
					<SelectPickup />
					<StyledPickupBox>
						<Button variant="contained" fullWidth onClick={submitPickupAddress}>
							Готово
						</Button>
					</StyledPickupBox>
				</StyledTabPanel>
			</TabContext>
		</StyledBox>
	)
}
