"use client"

import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded"
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded"
import { Stack, Typography } from "@mui/material"

import { decreaseMenuQuantity, increaseMenuQuantity } from "@entities/cart"
import { useOrderCounter } from "@shared/hooks"
import { useAppDispatch } from "@shared/lib/store"
import { CustomIconButton } from "@shared/ui/icon-button/custom-icon-button"

import { Props } from "./types"

export function ManageMenuQuantity(props: Props) {
	const { menuItem } = props

	const dispatch = useAppDispatch()

	const { handleAddition, handleSubstraction, counter } = useOrderCounter(
		menuItem.quantity,
	)

	const handleDecrease = () => {
		handleSubstraction()

		dispatch(decreaseMenuQuantity(menuItem))
	}

	const handleIncrease = () => {
		handleAddition()
		dispatch(increaseMenuQuantity(menuItem))
	}

	return (
		<Stack justifyContent="space-between" direction="row" alignItems="center">
			<Stack direction="row" alignItems="center" gap={1}>
				<CustomIconButton onClick={handleDecrease} fontSize="30px">
					<IndeterminateCheckBoxRoundedIcon />
				</CustomIconButton>

				<Typography>{counter}</Typography>

				<CustomIconButton onClick={handleIncrease} fontSize="30px">
					<AddBoxRoundedIcon />
				</CustomIconButton>
			</Stack>
			<Typography>{counter * menuItem.price} тенге</Typography>
		</Stack>
	)
}
