import { HeaderWidget } from "@/widgets/customer-widgets/header/header"
import { Stack } from "@mui/material"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeaderWidget />
			<Stack paddingX={2}>{children}</Stack>
		</>
	)
}
