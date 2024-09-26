import dynamic from "next/dynamic"

const OrderPage = dynamic(() => import("@pages/customer/order/order-page"))
export default function Order() {
	return <OrderPage />
}
