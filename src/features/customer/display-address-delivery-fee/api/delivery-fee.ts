import { baseApi } from "@shared/api"

import { DeliveryFeeTemplateResponse } from "./types"

export const deliveryFeeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getDeliveryFees: build.query<DeliveryFeeTemplateResponse, void>({
			query: () =>
				`delivery-fee-templates/1e0fcc56-b919-49a0-9a8b-b3921fd670f3`,
		}),
	}),
})

export const { useGetDeliveryFeesQuery } = deliveryFeeApi
