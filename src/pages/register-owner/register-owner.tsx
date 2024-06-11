"use client"

import { RegisterOwnerForm } from "@features/auth/register-owner"

import { Wrapper } from "./register-owner.styles"

export default function RegisterOwnerPage() {
	return (
		<Wrapper>
			<RegisterOwnerForm />
		</Wrapper>
	)
}
