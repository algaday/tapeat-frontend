import dynamic from "next/dynamic"

const MenuItemForm = dynamic(
	() => import("@/features/menu/create-menu-item/ui/menu-item-form"),
)
export default function CreateMenuPage() {
	return <MenuItemForm />
}
