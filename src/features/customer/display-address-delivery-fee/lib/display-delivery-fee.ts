import { DeliveryFeeTemplateResponse } from "../api/types"

export const displayDeliveryFeeText = (
	fees: DeliveryFeeTemplateResponse | undefined,
) => {
	let startText = ""
	let middleText = ""
	let endText = ""

	if (!fees) {
		return
	}

	fees.forEach((fee, index) => {
		if (index === 0) {
			startText = `Тариф на доставку:  до ${fees[index + 1].minOrderAmount} ₸ - ${fee.deliveryFee} ₸ за доставку,`
			return
		}

		if (index === fees.length - 1) {
			endText = ` от ${fee.minOrderAmount} ₸ - бесплатная доставка`
			return
		}

		middleText =
			middleText +
			` от ${fee.minOrderAmount} ₸ до ${fees[index + 1].minOrderAmount} ₸ - ${fee.deliveryFee} ₸ за доставку,`
	})

	return startText + middleText + endText
}
