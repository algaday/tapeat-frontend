import { useState } from "react"

import { Modal } from "@/shared/ui/modal/modal"
import { ModificationChangeModal } from "@/shared/ui/modification-change-modal/modification-change-modal"
import { ModificationChangeSchema } from "@/shared/ui/modification-change-modal/type"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone"
import { Button, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

import {
	useDeleteModificationGroupMutation,
	useUpdateModificationGroupMutation,
} from "../api/modification-group-api"
import { ModificationItem } from "./modification-item"
import { ModificationGroupOverviewProps } from "./types"

export function ModificationGroupOverview(
	props: ModificationGroupOverviewProps,
) {
	const [deleteModificationGroup] = useDeleteModificationGroupMutation()
	const [updateModificationGroup] = useUpdateModificationGroupMutation()

	const router = useRouter()

	const { id, name, modifications, isMultipleChoice } = props

	const [modal, setModal] = useState({ deleteModal: false, changeModal: false })

	const handleDelete = async () => {
		await deleteModificationGroup({ id }).unwrap()
		router.push("/dashboard/menu/modification-group")
	}

	const handleCancel = (name: string) => {
		setModal({ ...modal, [name]: false })
	}

	const handleChangeSubmit = async (data: ModificationChangeSchema) => {
		await updateModificationGroup({
			...data,
			id,
		}).unwrap()
		setModal({ ...modal, changeModal: false })
	}

	if (!modifications) {
		return <h1>No such element</h1>
	}
	return (
		<>
			<Typography variant="h4">Модификация: {name}</Typography>
			<Stack direction="row" marginTop={1} spacing={2}>
				<Button
					color="info"
					startIcon={<DriveFileRenameOutlineTwoToneIcon />}
					onClick={() => props.onModalOpen()}
				>
					Добавить модификацию
				</Button>
				<Button
					color="error"
					startIcon={<DeleteTwoToneIcon />}
					onClick={() => setModal({ ...modal, deleteModal: true })}
				>
					Удалить группу
				</Button>
			</Stack>
			<Stack direction="row" spacing={3} marginTop={2}>
				<Typography variant="h6">
					Опции выбора:{" "}
					{isMultipleChoice ? "Несколько опции выбора" : "Одна опция выбора"}
				</Typography>

				<Button onClick={() => setModal({ ...modal, changeModal: true })}>
					Изменить настройки
				</Button>
			</Stack>
			{modifications.map((modification) => (
				<ModificationItem key={modification.id} {...modification} />
			))}
			{modal.deleteModal && (
				<Modal
					text="Вы точно хотите удалить группу?"
					onDelete={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			{modal.changeModal && (
				<ModificationChangeModal
					onCancel={handleCancel}
					onSubmit={handleChangeSubmit}
					isMultipleChoice={isMultipleChoice}
				/>
			)}
		</>
	)
}
