import dynamic from "next/dynamic"

const SingleMenuItemPage = dynamic(
	() => import("@/pages/menu/single-menu-item/single-menu-item-page"),
)

export default function Page() {
	return <SingleMenuItemPage />
}
