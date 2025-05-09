import { z } from 'zod'

export const createBranchDtoSchema = z.object({
	address: z.string(),
	latitude: z.string(),
	longitude: z.string(),
})

export const restaurantBranchSchema = z.object({
	id: z.string(),
	address: z.string(),
	restaurantId: z.string(),
	latitude: z.string(),
	longitude: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
})

export type CreateBranchDto = z.infer<typeof createBranchDtoSchema>

export type RestaurantBranch = z.infer<typeof restaurantBranchSchema>
