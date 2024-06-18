import { useContext } from "react"

import { LngLat } from "@yandex/ymaps3-types"
import { useRouter } from "next/navigation"

import {
	addAddressAction,
	fetchAddressByUri,
	fetchAddressGeocode,
} from "@shared/api"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"
import { MapContext } from "@shared/providers"

export function useCoordinatesControl() {
	const context = useContext(MapContext)

	const deliveryType = useAppSelector((state) => state.user.deliveryOption)

	const dispatch = useAppDispatch()

	const router = useRouter()

	if (!context) {
		throw new Error("useCoordinatesControl must be used within a MapProvider")
	}

	const updateCoordinates = (coordinates: LngLat) => {
		context.setLocationContent((locationContent) => {
			return { ...locationContent, coordinates }
		})
	}

	const updateAddress = (address: string) => {
		context.setLocationContent((locationContent) => {
			return { ...locationContent, address: `Астана, ${address}` }
		})
	}

	const updateDeliveryType = (type: "delivery" | "pick-up" | "restaurant") => {
		context.setLocationContent((locationContent) => {
			return { ...locationContent, type }
		})
	}

	const findAddressByCoordinates = async (lngLat: string) => {
		const { address } = await fetchAddressGeocode(lngLat)

		const modifiedCoordinates = lngLat
			.split(",")
			.map((item) => Number(item)) as LngLat

		updateCoordinates(modifiedCoordinates)
		updateAddress(address)
	}

	const findCoordinatesByUri = async (uri: string, address: string) => {
		const result = await fetchAddressByUri(uri)

		const modifiedCoordinates =
			result.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
				.split(" ")
				.map((item) => Number(item)) as LngLat

		updateCoordinates(modifiedCoordinates)
		updateAddress(address)
	}

	const setApartmentAttributes = (name: string, value: string) => {
		context.setLocationContent((locationContent) => {
			return { ...locationContent, [name]: value }
		})
	}

	const submitAddress = () => {
		const { address, coordinates, entrance, flat, floor } =
			context.locationContent

		const modifiedCoordinates = coordinates.join(",")

		dispatch(
			addAddressAction({
				street: address,
				entrance,
				flat,
				floor,
				type: deliveryType,
				coordinates: modifiedCoordinates,
			}),
		)
	}

	const handleSubmit = () => {
		submitAddress()
		router.back()
	}

	return {
		updateCoordinates,
		locationContent: context.locationContent,
		findAddressByCoordinates,
		findCoordinatesByUri,
		updateAddress,
		setApartmentAttributes,
		submitAddress,
		updateDeliveryType,
		handleSubmit,
	}
}
