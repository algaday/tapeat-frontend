import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material'

import { useDeleteBranchMutation } from '@entities/restaurant-branch/api/restaurant-branch-api'

import { Branch } from './type'

type Props = {
	branches: undefined | Branch[]
}

export function BranchCard({ branches }: Props) {
	const [deleteBranch] = useDeleteBranchMutation()
	console.log(branches)
	if (branches?.length === 0) {
		return <Typography mt={2}>У вас нет активных филиалов</Typography>
	}

	return branches?.map((branch) => {
		return (
			<Card key={branch.id} sx={{ maxWidth: 400, marginTop: 2 }}>
				<CardContent>
					<Typography>Адрес:</Typography>
					<Typography>{branch.address}</Typography>
				</CardContent>
				<CardActions>
					<Button
						size="small"
						onClick={() => deleteBranch({ branchId: branch.id })}
					>
						Удалить
					</Button>
				</CardActions>
			</Card>
		)
	})
}
