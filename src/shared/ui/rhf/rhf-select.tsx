import { Controller, useFormContext } from "react-hook-form"

import {
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectProps,
	Stack,
} from "@mui/material"

import { useAppSelector } from "@shared/lib/store"

import { ModificationGroupChip } from "../modification-group-chip/modification-group-chip"

type Props = SelectProps & {
	name: string
	text: string
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

export function RHFSelect(props: Props) {
	const { control } = useFormContext()

	const modificationGroups = useAppSelector(
		(state) => state.modificationGroupsSlice.modificationGroups,
	)
	return (
		<Stack marginY={2}>
			<InputLabel id={props.labelId}>{props.text}</InputLabel>

			<Controller
				name={props.name}
				control={control}
				rules={{ required: true }}
				render={({ field }) => {
					return (
						<Select
							labelId={props.labelId}
							id={props.id}
							multiple
							value={field.value}
							onChange={field.onChange}
							input={
								<OutlinedInput id="select-multiple-chip" label={props.name} />
							}
							renderValue={(selected) => {
								return <ModificationGroupChip selected={selected} />
							}}
							MenuProps={MenuProps}
						>
							{modificationGroups?.map((modificationGroup) => {
								return (
									<MenuItem
										value={modificationGroup.id}
										key={modificationGroup.id}
									>
										{modificationGroup.name}
									</MenuItem>
								)
							})}
						</Select>
					)
				}}
			/>
		</Stack>
	)
}
