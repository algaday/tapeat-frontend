import { useState } from "react"

import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material"
import { LngLat } from "@yandex/ymaps3-types"

import { useCoordinatesControl } from "@shared/hooks"

import { Wrapper } from "./select-pickup.styles"

export const testData = [
	{
		id: 1,
		text: "улица Ханов Керея и Жанибека, 28",
		time: "10:00 - 22:00",
		coordinates: [71.428489, 51.113253],
	},
	{
		id: 2,
		text: "улица Сауран, 8",
		time: "10:00 - 22:00",
		coordinates: [71.422174, 51.121921],
	},
	{
		id: 3,
		text: "улица Сыганак, 16",
		time: "10:00 - 22:00",
		coordinates: [71.378183, 51.12949],
	},
	{
		id: 4,
		text: "улица Чингиза Айтматова, 28А",
		time: "10:00 - 22:00",
		coordinates: [71.359103, 51.120383],
	},
]

export function SelectPickup() {
	const { locationContent } = useCoordinatesControl()

	const [value, setValue] = useState<LngLat | null>(locationContent.coordinates)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const modifiedValue = event.target.value
			.split(",")
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
					{testData.map((item) => (
						<FormControlLabel
							key={item.id}
							value={String(item.coordinates)}
							control={<Check {...item} value={item.coordinates} />}
							label=""
						/>
					))}
				</RadioGroup>
			</FormControl>
		</Wrapper>
	)
}

function Check(props: { text: string; time: string; value: number[] }) {
	const { updateCoordinates, updateAddress } = useCoordinatesControl()

	const handleRadioChange = () => {
		updateCoordinates(props.value as LngLat)
		updateAddress(props.text)
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
				<Typography fontSize={16} color={"rgba(0,0,0,.5)"}>
					{props.time}
				</Typography>
			</Box>
		</Stack>
	)
}
