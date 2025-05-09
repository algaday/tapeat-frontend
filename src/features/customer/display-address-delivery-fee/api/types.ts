export type DeliveryFee = {
	id: string
	restaurantId: string
	minOrderAmount: string
	deliveryFee: string
}

export type DeliveryFeeTemplateResponse = DeliveryFee[]
