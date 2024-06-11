import { z } from "zod"

export const registerFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Must be a valid email" }),
	password: z.string().min(6, { message: "Must be at least 6 characters" }),
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	restaurantName: z.string().min(1, { message: "Restaurant name is required" }),
})

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
