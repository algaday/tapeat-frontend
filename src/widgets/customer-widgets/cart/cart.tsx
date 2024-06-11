"use client"

import { generateUniqueKey } from "@entities/cart"
import { MenuItemCartPreview } from "@entities/menu-item/cart-preview"
import { ManageMenuQuantity } from "@features/manage-menu-quantity/"
import { useAppSelector } from "@shared/lib/store"
import { EmptyCart } from "@shared/ui/empty-cart/empty-cart"

export function CartWidget() {
	const menuItems = useAppSelector((state) => state.cart.cart)

	if (menuItems.length === 0) {
		return <EmptyCart />
	}

	return (
		<>
			{menuItems.map((menuItem) => {
				return (
					<MenuItemCartPreview
						key={generateUniqueKey(menuItem)}
						id={menuItem.id}
						nameOfDish={menuItem.nameOfDish}
						image={menuItem.image.mediumThumbnailPath}
						description={menuItem.description}
						actionSlot={<ManageMenuQuantity menuItem={menuItem} />}
					/>
				)
			})}
		</>
	)
}
