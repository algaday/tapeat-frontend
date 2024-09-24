"use client"

import { useEffect } from "react"

import { CircularProgress, Typography } from "@mui/material"
import { useParams } from "next/navigation"

import { CustomerMenuItemOverview } from "@entities/menu-item/customer-menu-item-overview"
import {
	updateMenuItem,
	useGetMenuItemQuery,
} from "@entities/menu-item/menu-item-description"
import { useAppDispatch } from "@shared/lib/store"

export function MenuItemDetailsWidget() {
	const params = useParams<{ id: string }>()

	const dispatch = useAppDispatch()

	const menuId = params ? params.id : ""

	const { data, isError, isLoading, isSuccess } = useGetMenuItemQuery(menuId, {
		skip: !menuId,
	})

	useEffect(() => {
		if (data) {
			dispatch(updateMenuItem({ ...data, modifications: [] }))
		}
	}, [data, dispatch])

	if (isError) {
		return <Typography>There was an error</Typography>
	}

	if (isLoading) {
		return <CircularProgress />
	}

	if (isSuccess) {
		return (
			<>
				<CustomerMenuItemOverview {...data} />
			</>
		)
	}
}
