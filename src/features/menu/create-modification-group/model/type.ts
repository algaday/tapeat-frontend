import { z } from "zod"

export type Modification = {
	name: string
	price: string
}

export type ModificationGroupState = {
	modifications: Modification[]
}

export const createModificationGroupSchema = z.object({
	modificationGroupName: z
		.string()
		.min(1, { message: "Заполните название группы" }),
	isMultipleChoice: z.coerce.boolean(),

	modifications: z.array(
		z.object({
			name: z.string().min(1, { message: "Заполните название" }),
			price: z.string().min(1, { message: "Укажите цену" }),
			isMandatory: z.boolean().default(false),
		}),
	),
})

export type CreateModificationGroupSchema = z.infer<
	typeof createModificationGroupSchema
>
