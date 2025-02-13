import { useFormContext } from "react-hook-form"

import { TextField, TextFieldProps } from "@mui/material"
import get from "lodash/get"

type Props = TextFieldProps & {
	name: string
	showErrorMessage?: boolean
}

export function RHFInputField(props: Props) {
	const { name, showErrorMessage = true } = props
	const {
		register,
		formState: { errors },
		watch
	} = useFormContext()

	const error = get(errors, name)

	const errorText = error?.message as string

	const value = watch(name)

	return (
		<TextField
			{...props}
			{...register(name, { valueAsNumber: props.type === "number" })}
			error={!!error}
			helperText={showErrorMessage && errorText}
			InputLabelProps={{
				...props.InputLabelProps,
				shrink: value !== undefined && value !== null, // Forces label to shrink when error occurs
			}}
		/>
	)
}
