import dynamic from "next/dynamic"

const ModificationGroupPage = dynamic(
	() => import("@/pages/modification/modification-group/modification-group"),
)
export default function ModificationGroup() {
	return <ModificationGroupPage />
}
