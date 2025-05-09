"use client"

import { SubmitHandler, useForm } from "react-hook-form"

import AddIcon from "@mui/icons-material/Add"
import { Button, Divider, InputBase } from "@mui/material"

import { useCreateCategoryMutation } from "@entities/category"

import { ErrorText, StyledPaper } from "./create-category.styles"
import { InputType } from "./types"

export function CreateCategory() {
	const [createCategory] = useCreateCategoryMutation()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<InputType>()

	const onSubmit: SubmitHandler<InputType> = (data) => {
		createCategory({ category: data.category })
		reset()
	}

	return (
		<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<StyledPaper>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Название категории"
					{...register("category", { required: true, min: 1 })}
					color="error"
				/>

				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<Button
					type="submit"
					color="primary"
					sx={{ p: "10px" }}
					startIcon={<AddIcon />}
				>
					Добавить
				</Button>
				{errors.category && (
					<ErrorText color="error">Заполните поле!</ErrorText>
				)}
			</StyledPaper>
		</form>
	)
}
