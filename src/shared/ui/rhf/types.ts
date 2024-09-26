import { z } from "zod"

export const modificationGroupResponse = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	restaurantId: z.string(),
	isMultipleChoice: z.boolean(),
})

export type ModificationGroupResponse = z.infer<
	typeof modificationGroupResponse
>

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
