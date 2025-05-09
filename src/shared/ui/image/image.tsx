import { useState } from "react"

import { Image as ImageType } from "@/shared/api"
import EditIcon from "@mui/icons-material/Edit"
import { Button } from "@mui/material"
import Image from "next/image"

import { useCreateImageMutation } from "@shared/api"

import { StyledInputField, Wrapper } from "./image.styles"

export type ImageParams = {
	mediumThumbnailPath: string
	originalPath: string
	smallThumbnailPath: string
	restaurantId: string
}
type Props = {
	image: ImageParams
	onChange(image: ImageType): void
	error?: boolean
	helperText?: string
}

export function ModifiedImage(props: Props) {
	const { mediumThumbnailPath } = props.image

	const [imageUrl, setImageUrl] = useState(mediumThumbnailPath)

	const [createImage] = useCreateImageMutation()

	const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			const image = await createImage(e.target.files[0]).unwrap()
			setImageUrl(image.mediumThumbnailPath)
			props.onChange(image)
		}
	}

	return (
		<Wrapper>
			<Image
				src={`https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket/${imageUrl}`}
				alt="img"
				width={150}
				height={150}
			/>
			<div className="icon-container">
				<Button
					component="label"
					variant="contained"
					tabIndex={-1}
					startIcon={<EditIcon />}
				>
					Заменить
					<StyledInputField
						type="file"
						onChange={onUploadImage}
						accept="image/png, image/jpeg"
					/>
				</Button>
			</div>
		</Wrapper>
	)
}
