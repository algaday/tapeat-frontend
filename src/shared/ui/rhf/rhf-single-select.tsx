import { Controller, useFormContext } from "react-hook-form"

import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectProps,
} from "@mui/material"

type Option = {
	restaurantId: string
	name: string
	id: string
}

type Props = SelectProps & {
	name: string
	labelText: string
	options: Option[]
}

export function RHFSingleSelect(props: Props) {
	const { control } = useFormContext()

	return (
		<Controller
			name={props.name}
			control={control}
			render={({ field }) => {
				return (
					<FormControl>
						{" "}
						<InputLabel id={props.labelText}>{props.labelText}</InputLabel>
						<Select
							labelId={props.labelId}
							id={props.id}
							label={props.labelText}
							value={field.value}
							onChange={field.onChange}
						>
							{props.options?.map((option) => {
								return (
									<MenuItem value={option.id} key={option.id}>
										{option.name}
									</MenuItem>
								)
							})}
						</Select>
					</FormControl>
				)
			}}
		/>
	)
}
