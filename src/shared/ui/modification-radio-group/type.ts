import { z } from "zod"

const modification = z.object({
	id: z.string(),
	modificationGroupId: z.string(),
	name: z.string(),
	price: z.string(),
	isMandatory: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
})

export const modificationGroupsSchema = z.object({
	modificationGroup: z.object({
		id: z.string(),
		isMultipleChoice: z.boolean(),
		name: z.string(),
		modifications: z.array(modification),
	}),
})

export type ModificationGroupSchema = z.infer<typeof modificationGroupsSchema>

export type Modification = z.infer<typeof modification>
