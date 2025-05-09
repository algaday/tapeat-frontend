import { useState } from 'react'

import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material'
import { LngLat } from '@yandex/ymaps3-types'

import { useGetBranchesQuery } from '@entities/restaurant-branch'
import { useCoordinatesControl } from '@shared/hooks'

import { Wrapper } from './select-pickup.styles'

export function SelectPickup() {
	const { locationContent } = useCoordinatesControl()
	const { data: pickupBranches, isLoading } = useGetBranchesQuery()
	const [value, setValue] = useState<LngLat | null>(
		locationContent.pickupAddress.coordinates,
	)
	if (!pickupBranches) {
		return <h1>Not found</h1>
	}
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const modifiedValue = event.target.value
			.split(',')
			.map((item) => Number(item))

		setValue(modifiedValue as LngLat)
	}

	return (
		<Wrapper>
			<FormControl>
				<RadioGroup
					name="controlled-radio-buttons-group"
					value={value}
					onChange={handleChange}
				>
					{pickupBranches.map((branch) => {
						const { address, latitude, longitude, id } = branch
						const coordindates = [
							Number(longitude),
							Number(latitude),
						]
						return (
							<FormControlLabel
								key={id}
								value={`${latitude},${longitude}`}
								control={
									<Check
										text={address}
										value={coordindates}
									/>
								}
								label=""
							/>
						)
					})}
				</RadioGroup>
			</FormControl>
		</Wrapper>
	)
}

function Check(props: { text: string; value: number[] }) {
	const { updatePickupAddress, updatePickupCoordinates } =
		useCoordinatesControl()

	const handleRadioChange = () => {
		updatePickupCoordinates(props.value as LngLat)
		updatePickupAddress(props.text)
	}

	return (
		<Stack direction="row" alignItems="flex-start" marginY={1}>
			<Radio value={String(props.value)} onChange={handleRadioChange} />
			<Box>
				<Typography
					component="div"
					variant="body1"
					fontSize="16px"
					fontWeight="900"
					lineHeight={1.2}
				>
					{props.text}
				</Typography>
				<Typography fontSize={16} color={'rgba(0,0,0,.5)'}>
					10:00 - 22:00
				</Typography>
			</Box>
		</Stack>
	)
}
