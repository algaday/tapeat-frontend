import { withStack } from "@shared/lib/with-margin-hoc"
import {
	DeliveryAddress,
	DisplayMenuItemsWidget,
	Footer,
} from "@widgets/customer-widgets"

export function CustomerHomePage() {
	const DeliveryAddressWithMargin = withStack(DeliveryAddress, {
		marginX: 2,
		marginTop: "60px",
	})
	return (
		<>
			<DeliveryAddressWithMargin />
			<DisplayMenuItemsWidget />
			<Footer />
		</>
	)
}
