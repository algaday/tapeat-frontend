import React from "react"
import ReactDOM from "react-dom"

export async function loadYandexMapModules() {
	const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify")
	const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM)

	const { YMapZoomControl } = reactify.module(
		await ymaps3.import("@yandex/ymaps3-controls@0.0.1"),
	)

	return { module: reactify.module(ymaps3), YMapZoomControl }
}

export type ModuleType = Awaited<ReturnType<typeof loadYandexMapModules>>
