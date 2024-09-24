import dynamic from "next/dynamic"

const RegisterOwnerPage = dynamic(
	() => import("@/pages/register-owner/register-owner"),
)
export default function Page() {
	return (
		<>
			<RegisterOwnerPage />
		</>
	)
}
