import dynamic from "next/dynamic"

const MenuItemOverview = dynamic(
	() => import("@/pages/customer/menu-item-overview/menu-item-overview-page"),
)
export default function MenuItemOverviewPage() {
	return <MenuItemOverview />
}
