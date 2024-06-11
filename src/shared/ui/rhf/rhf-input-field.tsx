import { useFormContext } from "react-hook-form"

import { TextField, TextFieldProps } from "@mui/material"
import get from "lodash/get"

type Props = TextFieldProps & {
	name: string
}

export function RHFInputField(props: Props) {
	const { name } = props
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const error = get(errors, name)

	const errorText = error?.message as string

	return (
		<TextField
			{...props}
			{...register(name)}
			error={!!error}
			helperText={errorText}
		/>
	)
}
