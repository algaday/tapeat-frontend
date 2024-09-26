import dynamic from "next/dynamic"

const Cart = dynamic(() => import("@/pages/customer/cart/cart-page"))

export default function CartPage() {
	return <Cart />
}
