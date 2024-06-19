import { createContext, useEffect, useState } from "react"

import { getInitialState } from "@shared/lib/get-initial-state"

import { ContextType, LocationContent, Props } from "./types"

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
