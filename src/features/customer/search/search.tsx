import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { Stack } from "@mui/material"

export function Search() {
	return (
		<Stack direction="row" alignItems="center" spacing={1}>
			<InfoOutlinedIcon />
			<SearchIcon />
		</Stack>
	)
}
