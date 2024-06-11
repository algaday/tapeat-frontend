import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Stack,
	Typography,
} from "@mui/material"

import {
	Modification,
	ModificationGroupSchema,
} from "../modification-radio-group/type"

type Props = ModificationGroupSchema & {
	onChange: (modification: Modification) => void
}

export function ModificationCheckboxGroup(props: Props) {
	const { modificationGroup } = props

	return (
		<FormControl>
			<FormLabel id={modificationGroup.id}>{modificationGroup.name}</FormLabel>
			<FormGroup>
				{modificationGroup.modifications.map((modification) => {
					return (
						<Stack key={modification.id} direction="row" alignItems="center">
							<FormControlLabel
								value={modification.id}
								control={<Checkbox />}
								label={modification.name}
								onChange={() => props.onChange(modification)}
							/>

							<Typography fontStyle="italic">
								{modification.price} тенге
							</Typography>
						</Stack>
					)
				})}
			</FormGroup>
		</FormControl>
	)
}
