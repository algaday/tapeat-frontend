import { z } from "zod"

const phoneRegex = new RegExp(
	/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/,
)

export const orderFormSchema = z.object({
	name: z.string().min(1, { message: "Укажите Ваше имя" }),
	phoneNumber: z.string().regex(phoneRegex, "Введите валидный номер"),

	comments: z.string().optional(),
})

export type OrderFormSchema = z.infer<typeof orderFormSchema>
