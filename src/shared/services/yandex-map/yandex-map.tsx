"use client"

import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import LocationOnIcon from "@mui/icons-material/LocationOn"
import { IconButton } from "@mui/material"

import { fetchAddress } from "@entities/user/model/fetch-address-thunk"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

async function loadYandexMapModules() {
	const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify")
	const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM)

	return reactify.module(ymaps3)
}

export function MapCheck() {
	const dispatch = useAppDispatch()
	const [modules, setModules] = useState()
	const coordinate = useAppSelector((state) => state.user.coordinate)

	useEffect(() => {
		async function initializeModules() {
			const loadedModules = await loadYandexMapModules()
			setModules(loadedModules)
		}
		initializeModules()
	}, [])

	if (!modules) {
		return <div>Loading...</div>
	}

	const {
		YMap,
		YMapDefaultSchemeLayer,
		YMapDefaultFeaturesLayer,
		YMapListener,
	} = modules

	const handleUpdate = (data) => {
		const loci = data.location.center.join(",")
		dispatch(fetchAddress(loci))
	}

	return (
		<div style={{ width: "100%", height: "60vh", position: "relative" }}>
			<YMap
				location={{ center: coordinate, zoom: 16 }}
				mode="vector"
				behaviors={["drag"]}
			>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />
				<YMapListener onActionEnd={handleUpdate} />

				<IconButton
					sx={{
						position: "absolute",
						zIndex: "999",
						top: "45%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<LocationOnIcon sx={{ color: "red", fontSize: "50px" }} />
				</IconButton>
			</YMap>
		</div>
	)
}
