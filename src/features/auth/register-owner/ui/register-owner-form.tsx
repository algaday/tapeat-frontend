"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { RHFInputField } from "@/shared/ui/rhf/rhf-input-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useRegisterOwnerMutation } from "@entities/user"

import {
	RegisterFormSchema,
	registerFormSchema,
} from "../model/register-form-schema"
import { FormWrapper } from "./register-owner-form.styles"

export function RegisterOwnerForm() {
	const router = useRouter()

	const methods = useForm<RegisterFormSchema>({
		resolver: zodResolver(registerFormSchema),
	})

	const [registerOwner] = useRegisterOwnerMutation()

	const onSubmit: SubmitHandler<RegisterFormSchema> = async (user) => {
		try {
			await registerOwner(user).unwrap()
			router.replace("/login")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<FormProvider {...methods}>
			<FormWrapper autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
				<Typography variant="h6" component="h2">
					Register as Restaurant Owner
				</Typography>
				<RHFInputField name="email" id="email" label="Email" margin="normal" />
				<RHFInputField
					name="password"
					type="password"
					id="password"
					label="Password"
					margin="normal"
				/>
				<RHFInputField
					name="firstName"
					id="firstName"
					label="First Name"
					margin="normal"
				/>
				<RHFInputField
					name="lastName"
					id="lastName"
					label="Last Name"
					margin="normal"
				/>
				<RHFInputField
					name="restaurantName"
					id="restaurantName"
					label="Restaurant Name"
					margin="normal"
				/>
				<Button variant="contained" type="submit">
					Continue
				</Button>
				<div className="footer">
					<Typography variant="subtitle2">Already have an account?</Typography>
					<Link href="/login">
						<Typography variant="subtitle2">Login</Typography>
					</Link>
				</div>
			</FormWrapper>
		</FormProvider>
	)
}
