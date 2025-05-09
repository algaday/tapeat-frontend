import { z } from "zod"

export const menuItemsSchema = z.object({
	id: z.string(),
	description: z.string(),
	nameOfDish: z.string(),
	price: z.string(),
	restaurantId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	category: z.object({
		id: z.string(),
		name: z.string(),
		restaurantId: z.string(),
	}),
	image: z.object({
		imageId: z.string(),
		restaurantId: z.string(),
		originalPath: z.string(),
		mediumThumbnailPath: z.string(),
		smallThumbnailPath: z.string(),
	}),
})

export type MenuItemsSchema = z.infer<typeof menuItemsSchema>
