import type { Metadata } from "next"

import CustomThemeProvider from "@/app/providers/custom-theme-provider"
import ToastProvider from "@/app/providers/toast-provider"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import Script from "next/script"

const ReduxProvider = dynamic(() => import("@/app/providers/redux-provider"), {
	ssr: false,
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Tapeat App",
	description: "Online order app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" style={{ height: "100%", scrollBehavior: "smooth" }}>
			<Script src="https://api-maps.yandex.ru/v3/?apikey=d419fb5f-e802-442b-b6fb-050bd0b4a604&lang=ru_RU" />
			<body className={inter.className} style={{ height: "100%" }}>
				<ReduxProvider>
					<CustomThemeProvider>
						<ToastProvider>{children}</ToastProvider>
					</CustomThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	)
}
