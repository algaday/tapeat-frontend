import dynamic from "next/dynamic"

const CreateModificationGroupPage = dynamic(
	() =>
		import(
			"@/pages/modification/create-modification-group/create-modification-group"
		),
)
export default function CreateModificationGroup() {
	return <CreateModificationGroupPage />
}
