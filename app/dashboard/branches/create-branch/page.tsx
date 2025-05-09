"use client"

import dynamic from "next/dynamic"

const RestaurantBranchForm = dynamic(
	() =>
		import(
			"@/features/restaurant-branch/restaurant-branch-form/ui/restaurant-branch-form"
		),
)
export default function CreateBranch() {
	return <RestaurantBranchForm />
}
