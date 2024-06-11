export type ModificationPayload = {
	prevModificationId: null | string
	modification: Modification
}

export type Modification = { id: string; price: number }
