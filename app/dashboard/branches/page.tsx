"use client"

import dynamic from "next/dynamic"

const RestaurantBranchPage = dynamic(
	() => import("@/pages/restaurant-branch/ui"),
)
export default function Branches() {
	return (
		<>
			<RestaurantBranchPage />
		</>
	)
}
