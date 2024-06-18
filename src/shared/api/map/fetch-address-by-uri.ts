import { GeocodeResponse } from "./types"

export const fetchAddressByUri = async (uri: string) => {
	const url = "https://geocode-maps.yandex.ru/1.x/"

	const params = new URLSearchParams({
		apikey: process.env.geoApiKey as string,
		uri,
		format: "json",
	})

	const response = await fetch(`${url}?${params.toString()}`)

	const data: GeocodeResponse = await response.json()

	return data.response
}
