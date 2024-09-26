import dynamic from "next/dynamic"

const AllMenuItemsPage = dynamic(
	() => import("@/pages/menu/all-menu-items/all-menu-items"),
)
export default function Menu() {
	return (
		<>
			<AllMenuItemsPage />
		</>
	)
}
