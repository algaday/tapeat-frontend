import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { Button, IconButton, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

import { addToCart } from "@entities/cart"
import { useOrderCounter } from "@shared/hooks"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

import { StyledStack } from "./add-menu-to-cart.styles"

export function AddMenuToCart() {
	const menuItem = useAppSelector((state) => state.menuItem.menuItem)

	const dispatch = useAppDispatch()

	const { counter, handleAddition, handleSubstraction } = useOrderCounter(1)

	const router = useRouter()

	const handleClick = () => {
		if (menuItem) {
			dispatch(addToCart({ ...menuItem, quantity: counter }))

			router.push("/frito")
		}
	}

	return (
		<StyledStack direction="row" gap={2}>
			<Stack direction="row" alignItems="center" gap={1}>
				<IconButton onClick={handleSubstraction} disabled={counter <= 1}>
					<RemoveIcon />
				</IconButton>
				<Typography>{counter}</Typography>
				<IconButton onClick={handleAddition}>
					<AddIcon />
				</IconButton>
			</Stack>
			<Button variant="contained" fullWidth onClick={handleClick}>
				Добавить
			</Button>
		</StyledStack>
	)
}
