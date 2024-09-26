import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { Button, IconButton, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { addToCart } from "@entities/cart"
import { MenuItemSchema } from "@entities/menu-item/menu-item-description/api/types"
import { useOrderCounter } from "@shared/hooks"
import { useAppDispatch } from "@shared/lib/store"

import { getModificationsPrice } from "../lib/get-modification-price"
import { RHFCheckboxModification } from "./checkbox/rhf-checkbox-modification"
import {
	FormWrapper,
	StyledBox,
	StyledImageBox,
	StyledStack,
} from "./customer-menu-item-overview.styles"
import { RHFModificationRadioSelection } from "./radio/rhf-radio-modification"

export function CustomerMenuItemOverview(props: MenuItemSchema) {
	const methods = useForm()
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { counter, handleAddition, handleSubstraction } = useOrderCounter(1)

	const onSubmit: SubmitHandler<{
		[index: string]: string | string[]
	}> = async (data) => {
		const { modificationGroups, ...menuItem } = props

		if (!data) {
			const menuWithoutModifications = {
				...menuItem,
				quantity: counter,
				modifications: [],
			}

			dispatch(addToCart(menuWithoutModifications))
			router.push("/frito")
			return
		}

		const modifications = getModificationsPrice(props.modificationGroups, data)

		const menuWithModifications = {
			...menuItem,
			quantity: counter,
			modifications,
		}

		dispatch(addToCart(menuWithModifications))
		router.push("/frito")
	}

	return (
		<FormProvider {...methods}>
			<StyledImageBox>
				<Image
					src={`https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket/${props.image.mediumThumbnailPath}`}
					alt="pizza"
					fill={true}
					objectFit="cover"
				/>
			</StyledImageBox>

			<StyledBox>
				<Stack>
					<Typography variant="h6" fontWeight={600}>
						{props.nameOfDish}
					</Typography>
					<Typography fontWeight={600}>{props.price} ₸</Typography>
					<Typography paddingTop={1}>{props.description}</Typography>
				</Stack>

				<FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
					{props.modificationGroups.map((modificationGroup) => {
						const validationRules = modificationGroup.isMandatory
							? { required: `Выберите ${modificationGroup.name} ` }
							: undefined

						return modificationGroup.isMultipleChoice ? (
							<RHFCheckboxModification
								name={modificationGroup.name}
								label={modificationGroup.name}
								options={modificationGroup.modifications}
								validationRules={validationRules}
								key={modificationGroup.id}
							/>
						) : (
							<RHFModificationRadioSelection
								labelText={modificationGroup.name}
								name={modificationGroup.name}
								options={modificationGroup.modifications}
								validationRules={validationRules}
								key={modificationGroup.id}
							/>
						)
					})}
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
						<Button variant="contained" fullWidth type="submit">
							Добавить
						</Button>
					</StyledStack>
				</FormWrapper>
			</StyledBox>
		</FormProvider>
	)
}
