"use client"

import {
	FormProvider,
	SubmitHandler,
	useFieldArray,
	useForm,
} from "react-hook-form"

import { RHFSwitch } from "@/shared/ui/rhf/rhd-switch"
import { RHFInputField } from "@/shared/ui/rhf/rhf-input-field"
import { RHFRadio } from "@/shared/ui/rhf/rhf-radio"
import { zodResolver } from "@hookform/resolvers/zod"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

import { useCreateModificationGroupMutation } from "@entities/modification-group"

import {
	CreateModificationGroupSchema,
	createModificationGroupSchema,
} from "../model/type"
import { Wrapper } from "./create-modification-group-form.styles"

const options = [
	{
		id: "1",
		label: "Одна опция",
		value: false,
	},
	{
		id: "2",
		label: "Несколько опции",
		value: true,
	},
]

export function CreateModificationGroupForm() {
	const [createModificationGroup] = useCreateModificationGroupMutation()

	const router = useRouter()

	const methods = useForm<CreateModificationGroupSchema>({
		defaultValues: {
			modifications: [{ name: "", price: "", isMandatory: false }],
			isMultipleChoice: false,
		},
		resolver: zodResolver(createModificationGroupSchema),
	})

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "modifications",
	})

	const onSubmit: SubmitHandler<CreateModificationGroupSchema> = async (
		data,
	) => {
		await createModificationGroup(data).unwrap()
		router.push("/dashboard/menu/modification-group")
	}

	const addModification = () => {
		append({ name: "", price: "", isMandatory: false })
	}

	const removeModification = (index: number) => {
		remove(index)
	}

	return (
		<FormProvider {...methods}>
			<Wrapper onSubmit={methods.handleSubmit(onSubmit)}>
				<Typography variant="h5" component="h2">
					Создать группу модификации
				</Typography>
				<RHFInputField
					name="modificationGroupName"
					id="modificationGroupName"
					label="Название группы модификации"
					margin="normal"
				/>
				<Box marginY={2}>
					<Typography variant="h6" component="h2">
						Модификация
					</Typography>
					{fields.map((field, index) => (
						<Stack key={field.id} marginTop={1}>
							<Stack direction={"row"} spacing={1}>
								<RHFInputField
									name={`modifications.${index}.name`}
									label="Названия"
								/>
								<RHFInputField
									name={`modifications.${index}.price`}
									label="Цена"
									type="number"
								/>
								<IconButton onClick={() => removeModification(index)}>
									<DeleteOutlineOutlinedIcon color="error" />
								</IconButton>
							</Stack>
							<RHFSwitch
								name={`modifications.${index}.isMandatory`}
								text="Обязательное модификация"
							/>
						</Stack>
					))}
					<Button onClick={addModification} startIcon={<AddOutlinedIcon />}>
						Добавить модификацию
					</Button>
				</Box>
				<Box>
					<Typography variant="h6" component="h2">
						Настройка группы модификаций
					</Typography>
					<Stack direction="row" spacing={2} marginY={2}>
						<RHFRadio
							name="isMultipleChoice"
							labelText="Выбор опции"
							options={options}
						/>
					</Stack>
				</Box>
				<Stack spacing={1}>
					<Button variant="contained" type="submit">
						Сохранить
					</Button>
				</Stack>
			</Wrapper>
		</FormProvider>
	)
}
