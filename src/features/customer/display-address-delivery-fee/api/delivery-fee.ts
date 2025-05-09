import { baseApi } from "@shared/api"

import { DeliveryFeeTemplateResponse } from "./types"

export const deliveryFeeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getDeliveryFees: build.query<DeliveryFeeTemplateResponse, void>({
			query: () => "delivery-fee-templates",
		}),
	}),
})

export const { useGetDeliveryFeesQuery } = deliveryFeeApi
