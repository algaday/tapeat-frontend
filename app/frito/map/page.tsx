"use client"

import dynamic from "next/dynamic"

import { MapProvider } from "@shared/providers"

const LocationMap = dynamic(
	() => import("@widgets/customer-widgets/location-map/location-map"),
	{ ssr: false },
)

export default function MapPage() {
	return (
		<MapProvider>
			<LocationMap />
		</MapProvider>
	)
}
