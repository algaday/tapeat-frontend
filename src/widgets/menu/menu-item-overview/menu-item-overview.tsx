"use client"

import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { RHFImageUpdate } from "@/shared/ui/rhf/rhf-image-update"
import { RHFInputField } from "@/shared/ui/rhf/rhf-input-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, InputAdornment, Stack, Typography } from "@mui/material"
import { useParams, useRouter } from "next/navigation"

import { useGetCategoriesQuery } from "@entities/category"
import { useGetAllModificationGroupsQuery } from "@entities/modification-group"
import { RHFMultipleSelect } from "@shared/ui/rhf/rhf-multiple-select"
import { RHFSingleSelect } from "@shared/ui/rhf/rhf-single-select"

import {
	useDeleteMenuItemMutation,
	useGetSingleMenuItemQuery,
	useUpdateMenuItemMutation,
} from "./api/single-menu-item-api"
import { UpdateMenuItemDto, updateMenuItemSchema } from "./api/types"
import { StyledForm } from "./menu-item-overview.styless"

export function MenuItemOverviewWidget() {
	const params = useParams<{ menuItemId: string }>()

	const menuId = params ? params.menuItemId : ""

	const {
		data: menuItem,
		isLoading,
		error,
		isSuccess,
	} = useGetSingleMenuItemQuery(menuId, {
		skip: !menuId,
	})

	const { data: categories, isSuccess: categoriesSuccess } =
		useGetCategoriesQuery()

	const { data: modifications } = useGetAllModificationGroupsQuery()

	const [updateMenuItems] = useUpdateMenuItemMutation()

	const [deleteMenuItem] = useDeleteMenuItemMutation()

	const router = useRouter()

	const modificationGroupsArray = menuItem?.modificationGroups?.map(
		(menuItem) => menuItem.id,
	)

	const methods = useForm<UpdateMenuItemDto>({
		resolver: zodResolver(updateMenuItemSchema),
		defaultValues: {
			modificationGroupIds: [],
			categoryId: "",
		},
	})

	useEffect(() => {
		if (!isLoading && !error && menuItem) {
			methods.setValue("menuItemId", menuItem.id, { shouldValidate: true })
			methods.setValue("name", menuItem.nameOfDish, { shouldValidate: true })
			methods.setValue("categoryId", menuItem.category.id, {
				shouldValidate: true,
			})
			methods.setValue("description", menuItem.description, {
				shouldValidate: true,
			})
			methods.setValue("price", menuItem.price, { shouldValidate: true })
			methods.setValue("imageId", menuItem.image.imageId, {
				shouldValidate: true,
			})
			methods.setValue("modificationGroupIds", modificationGroupsArray!, {
				shouldValidate: true,
			})
		}
	}, [menuItem, error, isLoading, methods])

	const onSubmit: SubmitHandler<UpdateMenuItemDto> = async (data) => {
		await updateMenuItems(data).unwrap()

		router.push("/dashboard/menu")
	}

	const handleDelete = async () => {
		await deleteMenuItem({ menuItemId: menuItem?.id })
		router.push("/dashboard/menu")
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (isSuccess && categoriesSuccess && modifications) {
		return (
			<FormProvider {...methods}>
				<StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
					<Typography variant="h6" component="h2">
						Редактировать
					</Typography>
					<RHFInputField
						name="name"
						id="name"
						label="Название"
						margin="normal"
					/>
					<RHFSingleSelect
						name="categoryId"
						id="category"
						labelText="Категория"
						options={categories}
					/>
					<RHFInputField
						name="description"
						id="description"
						label="Описание блюда"
						margin="normal"
					/>
					<RHFInputField
						type="number"
						name="price"
						id="price"
						label="Цена"
						margin="normal"
						InputProps={{
							inputProps: { min: 0, max: 100000 },
							endAdornment: (
								<InputAdornment position="start">тг</InputAdornment>
							),
						}}
					/>

					<RHFMultipleSelect
						options={modifications}
						name="modificationGroupIds"
						text="Группа Модификации"
					/>
					<RHFImageUpdate image={menuItem.image} name="imageId" />
					<Stack direction="column" spacing={2} marginTop={2}>
						<Button variant="contained" type="submit">
							Изменить
						</Button>
						<Button
							variant="outlined"
							type="button"
							color="error"
							onClick={() => handleDelete()}
						>
							Удалить
						</Button>
					</Stack>
				</StyledForm>
			</FormProvider>
		)
	}
}
