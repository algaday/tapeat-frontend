"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, TextField } from "@mui/material"
import { useRouter } from "next/navigation"

import { RHFInputField } from "@shared/ui/rhf/rhf-input-field"

import { useAddress } from "../lib/useAddress"
import { OrderFormSchema, orderFormSchema } from "../model/order-form-schema"
import { Wrapper } from "./order-form.styles"

export function OrderForm() {
	const router = useRouter()

	const { fullAddress, totalAmount } = useAddress()

	const methods = useForm<OrderFormSchema>({
		resolver: zodResolver(orderFormSchema),
	})

	const onSubmit: SubmitHandler<OrderFormSchema> = async () => {}

	return (
		<FormProvider {...methods}>
			<Wrapper onSubmit={methods.handleSubmit(onSubmit)}>
				<Stack>
					<TextField
						name="address"
						label="Адрес доставки"
						margin="normal"
						size="small"
						value={fullAddress}
						multiline
						onClick={() => router.push("/frito/map")}
					/>

					<RHFInputField
						name="name"
						label="Ваше имя"
						margin="normal"
						size="small"
					/>

					<RHFInputField
						name="phoneNumber"
						label="Ваш номер телефона"
						margin="normal"
						size="small"
					/>

					<RHFInputField
						type="tel"
						name="comments"
						label="Комментарий к заказу"
						margin="normal"
						multiline
					/>
				</Stack>
				<Stack>
					{totalAmount()}
					<Button variant="contained" type="submit">
						Заказать
					</Button>
				</Stack>
			</Wrapper>
		</FormProvider>
	)
}
