import dynamic from "next/dynamic"

const CustomerHomePage = dynamic(
	() => import("@/pages/customer/homepage/customer-home-page"),
)

export default function FritoPage() {
	return (
		<>
			<CustomerHomePage />
		</>
	)
}
