import { MenuItem } from "./types"

export function calculateMenuTotalWithQuantity(menuItem: MenuItem) {
	return (
		Number(menuItem.price) * Number(menuItem.quantity) +
		menuItem.modifications.reduce(
			(total, menuItem) => (total += Number(menuItem.price)),
			0,
		)
	)
}
export function calculateMenuTotal(menuItem: MenuItem) {
	const { price } = menuItem

	return (
		Number(price) +
		menuItem.modifications.reduce(
			(total, menuItem) => (total += Number(menuItem.price)),
			0,
		)
	)
}
