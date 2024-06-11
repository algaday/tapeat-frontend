import { validateResponse } from "@/shared/lib/validate-response"

import { baseApi } from "../base-api"
import { CreateImageDto, Image, ImageSchema } from "./types"

export const imageApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createImage: build.mutation<Image, CreateImageDto>({
			query: (imageFile) => {
				const bodyFormData = new FormData()
				bodyFormData.append("image", imageFile)
				return {
					url: "/media/upload-image",
					method: "POST",
					body: bodyFormData,
				}
			},
			transformResponse: validateResponse(ImageSchema),
		}),
	}),
})

export const { useCreateImageMutation } = imageApi
