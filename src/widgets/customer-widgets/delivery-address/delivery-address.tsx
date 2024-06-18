import { Stack } from "@mui/material"

import { ChangeDeliveryOptions } from "@features/customer/change-delivery-options"
import { DisplayAddressButton } from "@features/customer/display-address-button"

export function DeliveryAddress() {
	return (
		<Stack spacing={1} marginY={1}>
			<ChangeDeliveryOptions />
			<DisplayAddressButton />
		</Stack>
	)
}
