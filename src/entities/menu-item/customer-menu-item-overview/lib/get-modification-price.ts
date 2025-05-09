import { ModificationGroupSchema } from "@entities/modification-group/api/types"

export function getModificationsPrice(
	modificationGroups: ModificationGroupSchema[],
	data: { [index: string]: string | string[] },
) {
	const modificationsWithPrice: { id: string; price: string; name: string }[] =
		[]

	for (const modificationKey in data) {
		modificationGroups.map((modificationGroup) => {
			if (modificationGroup.name === modificationKey) {
				if (!Array.isArray(data[modificationKey])) {
					modificationGroup.modifications.map((modification) => {
						if (modification.id === data[modificationKey]) {
							modificationsWithPrice.push({
								id: modification.id,
								price: modification.price,
								name: modification.name,
							})
						}
					})
				} else {
					data[modificationKey].map((id) => {
						modificationGroup.modifications.map((modification) => {
							if (modification.id === id) {
								modificationsWithPrice.push({
									id: modification.id,
									price: modification.price,
									name: modification.name,
								})
							}
						})
					})
				}
			}
		})
	}

	return modificationsWithPrice
}
