import dynamic from "next/dynamic"

const ModificationGroupListWidget = dynamic(
	() => import("@/widgets/modification-group/display-list/ui/display-list"),
)
export default function ModificationGroup() {
	return <ModificationGroupListWidget />
}
