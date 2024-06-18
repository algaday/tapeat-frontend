"use client"

import { MapProvider } from "@shared/providers"
import { LocationMap } from "@widgets/customer-widgets/location-map/location-map"

export default function MapPage() {
	return (
		<MapProvider>
			<LocationMap />
		</MapProvider>
	)
}
