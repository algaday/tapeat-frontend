"use client"

import { useEffect, useState } from "react"

import { CircularProgress } from "@mui/material"

import { fetchAddress } from "@entities/user"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

import { loadYandexMapModules } from "../lib/load-map"
import {
	StyledIcon,
	StyledIconButton,
	StyledStack,
	Wrapper,
} from "./display-map.styles"

export function DisplayLocationMap() {
	const dispatch = useAppDispatch()

	const coordinate = useAppSelector((state) => state.user.coordinate)

	const [modules, setModules] = useState()

	useEffect(() => {
		async function initializeModules() {
			const loadedModules = await loadYandexMapModules()
			setModules(loadedModules)
		}
		initializeModules()
	}, [])

	if (!modules) {
		return (
			<StyledStack alignItems="center" justifyContent="center">
				<CircularProgress />
			</StyledStack>
		)
	}

	const {
		YMap,
		YMapDefaultSchemeLayer,
		YMapDefaultFeaturesLayer,
		YMapListener,
	} = modules

	const handleActionEnd = (data) => {
		const centerCoordinate = data.location.center.join(",")
		dispatch(fetchAddress(centerCoordinate))
	}

	return (
		<Wrapper>
			<YMap
				location={{ center: coordinate, zoom: 16 }}
				mode="vector"
				behaviors={["drag"]}
			>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />
				<YMapListener onActionEnd={handleActionEnd} />

				<StyledIconButton>
					<StyledIcon />
				</StyledIconButton>
			</YMap>
		</Wrapper>
	)
}
