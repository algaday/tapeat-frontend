import dynamic from "next/dynamic"

const LoginPage = dynamic(() => import("@/pages/login/login-page"))
export default function Page() {
	return <LoginPage />
}
