"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { RHFImageUpload } from "@/shared/ui/rhf/rhf-image-upload"
import { RHFInputField } from "@/shared/ui/rhf/rhf-input-field"
import { zodResolver } from "@hookform/resolvers/zod"
import AddIcon from "@mui/icons-material/Add"
import {
	Button,
	CircularProgress,
	InputAdornment,
	Typography,
} from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useGetCategoriesQuery } from "@entities/category"
import { useGetAllModificationGroupsQuery } from "@entities/modification-group"
import { RHFMultipleSelect } from "@shared/ui/rhf/rhf-multiple-select"
import { RHFSingleSelect } from "@shared/ui/rhf/rhf-single-select"

import { useCreateMenuItemMutation } from "../api/create-menu-item-api"
import {
	CreateMenuItemSchema,
	createMenuItemSchema,
} from "../model/create-menu-item-schema"
import { Wrapper } from "./menu-item-form.styles"

export function MenuItemForm() {
	const [createMenuItem] = useCreateMenuItemMutation()

	const { data: categories, isLoading } = useGetCategoriesQuery()

	const { data: modificationGroups } = useGetAllModificationGroupsQuery()

	const router = useRouter()

	const methods = useForm<CreateMenuItemSchema>({
		defaultValues: {
			modificationGroupIds: [],
			categoryId: "",
		},
		resolver: zodResolver(createMenuItemSchema),
	})

	const onSubmit: SubmitHandler<CreateMenuItemSchema> = async (data) => {
		await createMenuItem({
			...data,
		}).unwrap()

		router.push("/dashboard/menu")
	}

	const addCategory = () => {
		return (
			<Button
				startIcon={<AddIcon />}
				href="/dashboard/menu/category"
				LinkComponent={Link}
				sx={{ textAlign: "left" }}
			>
				Добавить категорию
			</Button>
		)
	}

	const addModificationGroups = () => {
		return (
			<Button
				startIcon={<AddIcon />}
				href="/dashboard/menu/modification-group/create"
				LinkComponent={Link}
			>
				Добавить группу модификации
			</Button>
		)
	}

	if (isLoading) {
		return <CircularProgress />
	}

	if (modificationGroups && categories) {
		return (
			<FormProvider {...methods}>
				<Wrapper onSubmit={methods.handleSubmit(onSubmit)}>
					<Typography variant="h6" component="h2">
						Создать блюдо для ресторана
					</Typography>
					<RHFInputField
						name="name"
						id="name"
						label="Название"
						margin="normal"
					/>
					{categories.length === 0 ? (
						addCategory()
					) : (
						<RHFSingleSelect
							name="categoryId"
							id="category"
							labelText="Категория"
							options={categories}
						/>
					)}
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

					{modificationGroups.length === 0 ? (
						addModificationGroups()
					) : (
						<RHFMultipleSelect
							options={modificationGroups}
							name="modificationGroupIds"
							text="Группа Модификации"
						/>
					)}

					<RHFImageUpload name="imageId" />
					<Button
						variant="contained"
						type="submit"
						disabled={categories.length === 0 ? true : false}
					>
						Создать
					</Button>
				</Wrapper>
			</FormProvider>
		)
	}
}
