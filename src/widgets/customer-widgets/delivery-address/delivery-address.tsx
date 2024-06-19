import { Stack } from "@mui/material"

import { DeliveryOptions } from "@features/customer/delivery-options"
import { DisplayAddressButton } from "@features/customer/display-address-button"

export function DeliveryAddress() {
	return (
		<Stack spacing={1} marginY={1}>
			<DeliveryOptions />
			<DisplayAddressButton />
		</Stack>
	)
}
