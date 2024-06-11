import { z } from "zod"

export type CartState = {
	cart: MenuItem[] | []
}

const modifications = z.object({
	id: z.string(),
	price: z.number(),
})

const menu = z.object({
	id: z.string(),
	category: z.string(),
	description: z.string(),
	nameOfDish: z.string(),
	price: z.number(),
	restaurantId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	image: z.object({
		imageId: z.string(),
		restaurantId: z.string(),
		originalPath: z.string(),
		mediumThumbnailPath: z.string(),
		smallThumbnailPath: z.string(),
	}),
	quantity: z.number(),
	modifications: z.array(modifications),
})

export type MenuItem = z.infer<typeof menu>

export type Modification = z.infer<typeof modifications>

export type MenuId = {
	id: string
}
