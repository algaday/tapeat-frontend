"use client"

import { Stack } from "@mui/material"
import { useRouter } from "next/navigation"

import { generateUniqueKey } from "@entities/cart"
import { MenuItemCartPreview } from "@entities/menu-item/cart-preview"
import { DeliveryOptions } from "@features/customer/delivery-options"
import { DisplayAddressDeliveryFee } from "@features/customer/display-address-delivery-fee"
import { OrderTotalPrice } from "@features/customer/order-total-price"
import { ManageMenuQuantity } from "@features/manage-menu-quantity/"
import { useAppSelector } from "@shared/lib/store"
import { withStack } from "@shared/lib/with-margin-hoc"
import { EmptyCart } from "@shared/ui/empty-cart/empty-cart"

import { StyledBox } from "./cart.styles"

export function CartWidget() {
	const { cart: menuItems } = useAppSelector((state) => state.cart)

	const router = useRouter()

	const handleClick = () => {
		router.push("/frito/order")
	}

	const DeliveryOptionsWithMargin = withStack(DeliveryOptions, {
		marginBottom: 2,
		paddingX: 2,
	})

	if (menuItems.length === 0) {
		return <EmptyCart />
	}

	return (
		<StyledBox>
			<DeliveryOptionsWithMargin />
			<Stack paddingX={2}>
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
				<DisplayAddressDeliveryFee />
			</Stack>
			<OrderTotalPrice onClick={handleClick} buttonText="Далее" />
		</StyledBox>
	)
}
