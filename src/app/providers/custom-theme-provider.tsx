"use client"

import { CssBaseline, ThemeProvider } from "@mui/material"

import theme from "./theme"

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default CustomThemeProvider
