import { useFormContext } from "react-hook-form"

import { Image } from "@/shared/api"

import { ImageParams, ModifiedImage } from "../image/image"

type Props = {
	name: string
	image: ImageParams
}

export function RHFImageUpdate(props: Props) {
	const { setValue } = useFormContext()

	const onImageUploadChange = (image: Image) => {
		setValue(props.name, image.id, { shouldValidate: true })
	}

	return <ModifiedImage image={props.image} onChange={onImageUploadChange} />
}
