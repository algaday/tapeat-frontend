import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

import { useDeleteCategoryMutation } from "@entities/category"
import { CustomIconButton } from "@shared/ui/icon-button/custom-icon-button"

import { Props } from "./types"

export function DeleteCategory(props: Props) {
	const [deleteCategory] = useDeleteCategoryMutation()

	const handleClick = () => {
		deleteCategory({ id: props.id })
	}

	return (
		<CustomIconButton
			fontSize="24px"
			onClick={handleClick}
			customColor="#d32f2f"
		>
			<DeleteOutlineIcon />
		</CustomIconButton>
	)
}
