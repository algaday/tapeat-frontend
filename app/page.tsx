import dynamic from "next/dynamic"

const HomePage = dynamic(() => import("@pages/home/home-page"), { ssr: false })
export default function Home() {
	return (
		<main>
			<HomePage />
		</main>
	)
}
