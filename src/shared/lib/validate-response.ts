import { type ZodType } from "zod"

type TypeOf<T extends ZodType<any, any, any>> = T["_output"]

export function validateResponse<T extends ZodType<any, any, any>>(
	schema: T,
): (response: unknown, meta: unknown, arg: unknown) => TypeOf<T> {
	return (response) => schema.parse(response)
}
