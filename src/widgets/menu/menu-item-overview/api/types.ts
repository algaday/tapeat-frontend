import { z } from "zod"

export const updateMenuItemSchema = z.object({
	menuItemId: z.string().min(1),
	name: z.string().min(1, { message: "Заполните название" }),
	categoryId: z.string().min(1, { message: "Заполните категорию" }),
	description: z.string().min(1, { message: "Заполните описание" }),
	price: z.string().min(1, { message: "Укажите цену" }),
	imageId: z.string().min(1, { message: "Загрузите фотографию" }),
	modificationGroupIds: z.array(z.any()),
})

export const ResponseMenuItemSchema = z.object({
	id: z.string(),
	category: z.object({
		id: z.string(),
		name: z.string(),
		restaurantId: z.string(),
	}),
	description: z.string(),
	nameOfDish: z.string(),
	price: z.string(),
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
	modificationGroups: z
		.array(
			z.object({
				id: z.string(),
				menuItemId: z.string(),
				modificationId: z.string(),
				createdAt: z.string(),
				updatedAt: z.string(),
				modificationGroup: z.object({ name: z.string() }),
			}),
		)
		.optional(),
})

export type ResponseMenuItem = z.infer<typeof ResponseMenuItemSchema>
export type UpdateMenuItemDto = z.infer<typeof updateMenuItemSchema>
