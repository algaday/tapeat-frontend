"use client"

import { Button, Stack, Typography } from "@mui/material"

import { generateUniqueKey } from "@entities/cart"
import { MenuItemCartPreview } from "@entities/menu-item/cart-preview"
import { DeliveryOptions } from "@features/customer/delivery-options"
import { DisplayAddressDeliveryFee } from "@features/customer/display-address-delivery-fee"
import { ManageMenuQuantity } from "@features/manage-menu-quantity/"
import { useAppSelector } from "@shared/lib/store"
import { withStack } from "@shared/lib/with-margin-hoc"
import { EmptyCart } from "@shared/ui/empty-cart/empty-cart"

import { StyledFixedBox } from "./cart.styles"

export function CartWidget() {
	const { cart: menuItems, menuItemsTotal } = useAppSelector(
		(state) => state.cart,
	)

	const DeliveryOptionsWithStack = withStack(DeliveryOptions, {
		marginBottom: 2,
		paddingX: 2,
	})

	if (menuItems.length === 0) {
		return <EmptyCart />
	}

	return (
		<>
			<DeliveryOptionsWithStack />

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

			<StyledFixedBox paddingX={2}>
				<Stack direction="row" justifyContent="space-between" marginBottom={1}>
					<Typography variant="body1" fontWeight={600}>
						Итого
					</Typography>
					<Typography variant="body1" fontWeight={600}>
						{menuItemsTotal} тг
					</Typography>
				</Stack>
				<Button variant="contained" fullWidth>
					Далее
				</Button>
			</StyledFixedBox>
		</>
	)
}
