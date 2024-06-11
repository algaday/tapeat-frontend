import { Container } from "@mui/material"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Container
			sx={{ padding: "30px", width: "100%" }}
			maxWidth={false}
			disableGutters
		>
			{children}
		</Container>
	)
}
