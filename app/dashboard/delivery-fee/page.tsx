import dynamic from "next/dynamic"

const DeliveryFeePage = dynamic(
	() => import("@/pages/delivery/delivery-fee/delivery-fee"),
)
export default function DeliveryPage() {
	return <DeliveryFeePage />
}
