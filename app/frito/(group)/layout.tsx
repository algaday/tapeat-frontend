import { HeaderWidget } from "@/widgets/customer-widgets/header/header"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeaderWidget />
			{children}
		</>
	)
}