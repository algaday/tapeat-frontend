import { Controller, useFormContext } from "react-hook-form"

import {
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	RadioProps,
} from "@mui/material"

import { StyledFormControl } from "../checkbox/rhf-checkbox-modification.styles"

export type ModificationOptions = {
	id: string
	modificationGroupId: string
	name: string
	price: string
	createdAt: string
	updatedAt: string
}

type Props = RadioProps & {
	name: string
	labelText: string
	options: ModificationOptions[]
	validationRules?: { required: string }
}

export function RHFModificationRadioSelection(props: Props) {
	const { control, formState } = useFormContext()

	return (
		<Controller
			name={props.name}
			control={control}
			rules={props.validationRules}
			render={({ field }) => {
				return (
					<StyledFormControl highlight={formState.errors[props.name] && true}>
						<FormLabel id={props.labelText}>{props.labelText}</FormLabel>
						<RadioGroup
							value={field.value}
							onChange={field.onChange}
							name={props.name}
						>
							{props.options.map((option) => {
								return (
									<FormControlLabel
										key={option.id}
										value={option.id}
										control={<Radio />}
										label={option.name}
									/>
								)
							})}
						</RadioGroup>
					</StyledFormControl>
				)
			}}
		/>
	)
}
