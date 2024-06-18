"use client"

import { TabContext } from "@mui/lab"
import { Box, Button, Tab } from "@mui/material"

import { updateDeliveryOption } from "@entities/user"
import { DeliveryAddressForm } from "@features/map/delivery-address"
import { DisplayLocationMap } from "@features/map/display-map"
import { SelectPickup } from "@features/map/select-pickup"
import { useCoordinatesControl } from "@shared/hooks"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

import {
	StyledBox,
	StyledPickupBox,
	StyledTabList,
	StyledTabPanel,
} from "./location-map.styles"

type DeliveryVariants = "delivery" | "pick-up" | "restaurant"

export function LocationMap() {
	const tabType = useAppSelector((state) => state.user.deliveryOption)

	const dispatch = useAppDispatch()

	const { updateDeliveryType, handleSubmit } = useCoordinatesControl()

	const handleChange = (event: React.SyntheticEvent, tab: DeliveryVariants) => {
		dispatch(updateDeliveryOption(tab))
		updateDeliveryType(tab)
	}

	return (
		<StyledBox>
			<Box flex="1" position="relative">
				<DisplayLocationMap />
			</Box>

			<TabContext value={tabType}>
				<StyledTabList onChange={handleChange} centered>
					<Tab label="Доставка" value="delivery" />
					<Tab label="Самовывоз" value="pick-up" />
					<Tab label="В заведении" value="restaurant" />
				</StyledTabList>

				<StyledTabPanel value="delivery">
					<DeliveryAddressForm />
				</StyledTabPanel>

				<StyledTabPanel value="pick-up">
					<SelectPickup />
					<StyledPickupBox>
						<Button variant="contained" fullWidth onClick={handleSubmit}>
							Готово
						</Button>
					</StyledPickupBox>
				</StyledTabPanel>

				<StyledTabPanel value="restaurant">
					<SelectPickup />
					<StyledPickupBox>
						<Button variant="contained" fullWidth onClick={handleSubmit}>
							Готово
						</Button>
					</StyledPickupBox>
				</StyledTabPanel>
			</TabContext>
		</StyledBox>
	)
}
