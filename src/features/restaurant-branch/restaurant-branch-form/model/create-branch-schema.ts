import { z } from "zod"

export const createBranchSchema = z.object({
	address: z.string().min(1, { message: "Напишите адрес ресторана" }),
})

export type CreateBranchSchema = z.infer<typeof createBranchSchema>
