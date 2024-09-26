import React, { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { Checkbox, FormControlLabel, FormLabel } from "@mui/material"
import styled from "styled-components"

import { ModificationOptions } from "../radio/rhf-radio-modification"
import { StyledFormControl } from "./rhf-checkbox-modification.styles"

type Props = {
	name: string
	label: string
	options: ModificationOptions[]
	validationRules?: { required: string }
}

const Wrapper = styled(FormControlLabel)`
	&.MuiFormLabel-root {
		background-color: red;
	}
	&.MuiFormControlLabel-root {
		display: block;
	}
`

export const RHFCheckboxModification: React.FC<Props> = ({
	name,
	label,
	options,
	validationRules,
}) => {
	const { control, setValue, trigger, formState } = useFormContext()
	const [selectedItems, setSelectedItems] = useState<string[]>([])

	const handleSelect = (value: string) => {
		const isPresent = selectedItems.indexOf(value)

		if (isPresent !== -1) {
			const remaining = selectedItems.filter((item) => item !== value)
			setSelectedItems(remaining)
		} else {
			setSelectedItems((prevItems) => [...prevItems, value])
		}
	}

	useEffect(() => {
		setValue(name, selectedItems)
	}, [name, selectedItems, setValue, trigger])

	return (
		<StyledFormControl highlight={formState.errors[name] && true}>
			<FormLabel component="legend">{label}</FormLabel>
			<div>
				<Controller
					name={name}
					control={control}
					rules={validationRules} // Pass validation rules
					render={() => {
						return (
							<>
								{options.map((option) => (
									<Wrapper
										control={
											<Checkbox
												checked={selectedItems.includes(option.id)}
												onChange={() => handleSelect(option.id)}
											/>
										}
										label={option.name}
										key={option.id}
									/>
								))}
							</>
						)
					}}
				/>
			</div>
		</StyledFormControl>
	)
}
