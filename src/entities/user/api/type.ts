import { z } from "zod"

export const UserSchema = z.object({
	id: z.string(),
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
})

export type User = z.infer<typeof UserSchema>

export type CreateOwnerDto = {
	email: string
	firstName: string
	lastName: string
	password: string
	restaurantName: string
}
