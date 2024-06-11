import React from "react"
import ReactDOM from "react-dom"

export async function loadYandexMapModules() {
	const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify")
	const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM)

	return reactify.module(ymaps3)
}
