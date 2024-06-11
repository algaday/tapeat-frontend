import { z } from "zod"

export const modificationGroupResponse = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	restaurantId: z.string(),
	isMultipleChoice: z.boolean(),
})

export const modificationGroupDto = z.object({
	modificationGroupName: z.string(),
	isMultipleChoice: z.boolean(),

	modifications: z.array(
		z.object({
			name: z.string(),
			price: z.string(),
			isMandatory: z.boolean(),
		}),
	),
})

export const modificationGroupSchema = z.object({
	id: z.string(),
	isMultipleChoice: z.boolean(),
	name: z.string(),
	modifications: z.array(
		z.object({
			id: z.string(),
			modificationGroupId: z.string(),
			name: z.string(),
			price: z.string(),
			isMandatory: z.boolean(),
			createdAt: z.string(),
			updatedAt: z.string(),
		}),
	),
})

export type ModificationGroupSchema = z.infer<typeof modificationGroupSchema>

export type ModificationGroupResponse = z.infer<
	typeof modificationGroupResponse
>

export type ModificationGroupDto = z.infer<typeof modificationGroupDto>

type Modification = {
	id: string
	modificationGroupId: string
	name: string
	price: string
	createdAt: string
	updatedAt: string
	isMandatory: boolean
}

export type ModificationGroup = ModificationGroupResponse & {
	modifications: Modification[]
}

export type DeleteModificationGroupDto = {
	id: string
}

export type AddModificationDto = {
	modificationGroupId: string
	name: string
	price: string
	isMandatory: boolean
}
