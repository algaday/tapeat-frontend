type Modification = {
	id: string
	name: string
	price: string
}
export type Props = {
	nameOfDish: string
	id: string
	description: string
	image: string
	modifications: Modification[]
	actionSlot: JSX.Element
}
