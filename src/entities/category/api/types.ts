export type CreateCategoryResponse = {
	id: string
	name: string
	restaurantId: string
}

export type CreateCategoryDto = {
	name: string
}

export type DeleteCategoryDto = {
	id: string
}

export type CategoryMenuItemsResponse = Category[]

export type Category = {
	id: string
	name: string
	restaurantId: string
	menuItems: MenuItem[]
}

type MenuItem = {
	id: string
	nameOfDish: string
	categoryId: string
	description: string
	price: string
	restaurantId: string
	imageId: string
	createdAt: string
	updatedAt: string
	image: Image
}

type Image = {
	id: string
	restaurantId: string
	originalPath: string
	mediumThumbnailPath: string
	smallThumbnailPath: string
	isAssigned: string
	createdAt: string
	updatedAt: string
}
