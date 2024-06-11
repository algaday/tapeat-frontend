"use client"

import { LoginForm } from "@features/auth/login"

import { Wrapper } from "./login-page.styles"

export function LoginPage() {
	return (
		<Wrapper>
			<LoginForm />
		</Wrapper>
	)
}
