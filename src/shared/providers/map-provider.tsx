import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react"

import { LngLat } from "@yandex/ymaps3-types"

type Props = { children: ReactNode }

type LocationContent = {
	coordinates: LngLat
	address: string
	flat?: string
	floor?: string
	entrance?: string
	type: "delivery" | "pick-up" | "restaurant"
}

type ContextType = {
	locationContent: LocationContent
	setLocationContent: Dispatch<SetStateAction<LocationContent>>
}

function getInitialState() {
	const locationContent = localStorage.getItem("locationContent")
	return locationContent
		? JSON.parse(locationContent)
		: {
				coordinates: [71.430429, 51.128201],
				address: "Астана, бульвар Нуржол, 14",
				type: "delivery",
			}
}

export const MapContext = createContext<ContextType | undefined>(undefined)

export function MapProvider({ children }: Props) {
	const [locationContent, setLocationContent] =
		useState<LocationContent>(getInitialState)

	useEffect(() => {
		localStorage.setItem("locationContent", JSON.stringify(locationContent))
	}, [locationContent])

	return (
		<MapContext.Provider
			value={{
				locationContent,
				setLocationContent,
			}}
		>
			{children}
		</MapContext.Provider>
	)
}
