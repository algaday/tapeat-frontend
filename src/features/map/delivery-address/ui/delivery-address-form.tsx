"use client"

import { ChangeEvent, useEffect, useState } from "react"

import { Button, Stack, TextField, Typography } from "@mui/material"

import { addAddress, fetchLocation } from "@entities/user"
import { useSuggestAddressQuery } from "@shared/api"
import { useDebounce } from "@shared/hooks"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"
import { CustomToggleButtonGroup } from "@shared/ui/toggle-button-group/toggle-button-group"

import { AddressTagAndUri } from "../types"
import { Wrapper } from "./delivery-address-form.styles"
import { SuggestionResultsContainer } from "./suggestion-results-container"

export function DeliveryAddressForm() {
	const userAddress = useAppSelector((state) => state.user.address)

	const dispatch = useAppDispatch()

	const [address, setAddress] = useState("")

	const [isSuggestionOpen, setIsSuggestionOpen] = useState(false)

	const debouncedAddress = useDebounce(address, 1500)

	const {
		data: suggestions,
		isSuccess,
		isError,
	} = useSuggestAddressQuery(debouncedAddress, {
		skip: !debouncedAddress,
	})

	useEffect(() => {
		setAddress(userAddress)
	}, [userAddress])

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		setAddress(e.target.value)

		setIsSuggestionOpen(true)
	}

	function handleSuggestionClick({ address, tag, uri }: AddressTagAndUri) {
		if (tag !== "house") {
			return
		}

		dispatch(addAddress(address))

		dispatch(fetchLocation(uri))

		setIsSuggestionOpen(false)
	}

	if (isError) {
		return <Typography>There was an error</Typography>
	}

	if (isSuccess) {
		return (
			<Wrapper>
				<CustomToggleButtonGroup />

				<TextField
					value={address}
					label="Адрес доставки"
					fullWidth
					size="small"
					onChange={handleSearchChange}
				/>

				{isSuggestionOpen && (
					<SuggestionResultsContainer
						suggestions={suggestions?.results}
						onClick={handleSuggestionClick}
					/>
				)}

				<Stack direction="row" gap={2} marginY={2}>
					<TextField label="Квартира" fullWidth size="small" />
					<TextField label="Подъезд" fullWidth size="small" />
					<TextField label="Этаж" fullWidth size="small" />
				</Stack>

				<Button variant="contained" fullWidth>
					Готово
				</Button>
			</Wrapper>
		)
	}
}
