import { DeliveryAddressForm } from "@features/map/delivery-address"
import { DisplayLocationMap } from "@features/map/display-map"

export function LocationMap() {
	return (
		<main>
			<DisplayLocationMap />
			<DeliveryAddressForm />
		</main>
	)
}
