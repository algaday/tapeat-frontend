import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Stack } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { debounce } from '@mui/material/utils'

import { useCreateBranchMutation } from '@entities/restaurant-branch'
import { fetchAddressByUri, fetchSuggestions, Suggestion } from '@shared/api'

export default function RestaurantBranchSuggestion() {
	const [createBranch] = useCreateBranchMutation()
	const [value, setValue] = useState<Suggestion | null>(null)
	const [inputValue, setInputValue] = useState('')
	const [options, setOptions] = useState<readonly Suggestion[]>([])

	const fetch = useMemo(
		() =>
			debounce(
				async (
					request: { input: string },
					callback: (results?: readonly Suggestion[]) => void,
				) => {
					const data = await fetchSuggestions(request.input)
					callback(data)
				},
				300,
			),
		[],
	)

	useEffect(() => {
		let active = true
		if (inputValue === '') {
			setOptions(value ? [value] : [])
			return undefined
		}

		fetch({ input: inputValue }, (results?: readonly Suggestion[]) => {
			if (active) {
				let newOptions: readonly Suggestion[] = []

				if (value) {
					newOptions = [value]
				}

				if (results) {
					newOptions = [...newOptions, ...results]
				}

				setOptions(newOptions)
			}
		})

		return () => {
			active = false
		}
	}, [value, inputValue, fetch])

	const handleSubmit = async () => {
		if (value?.tags[0] !== 'house') {
			toast.error('Укажите точный адрес')
			return
		}

		const result = await fetchAddressByUri(value.uri)

		const [longitude, latitude] =
			result.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
				' ',
			)

		const address =
			result.GeoObjectCollection.featureMember[0].GeoObject.name

		await createBranch({ address, longitude, latitude })
			.unwrap()
			.then((res) => toast.success('Филиал создан'))
			.catch((err) => toast.error(err.message))

		setValue(null)
	}

	return (
		<Stack direction="row" alignItems="end" gap={2}>
			<Autocomplete
				sx={{ minWidth: '250px', maxWidth: '350px' }}
				filterOptions={(x) => x}
				getOptionLabel={(option) => {
					return typeof option === 'string'
						? option
						: option.title.text
				}}
				options={options.map((option) => {
					return option
				})}
				value={value}
				noOptionsText="Введите адрес филиала"
				onChange={(event: any, newValue: Suggestion | null) => {
					setOptions(newValue ? [newValue, ...options] : options)
					setValue(newValue)
				}}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue)
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Адрес"
						fullWidth
						variant="standard"
					/>
				)}
			/>
			<Button onClick={handleSubmit} variant="outlined">
				Создать филиал
			</Button>
		</Stack>
	)
}
