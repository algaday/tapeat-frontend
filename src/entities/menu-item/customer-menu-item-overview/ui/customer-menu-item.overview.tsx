import { Stack, Typography } from "@mui/material"
import Image from "next/image"

import { StyledBox, StyledImageBox } from "./customer-menu-item-overview.styles"

type Props = {
	readonly actionSlot: JSX.Element
	modificationsSlot: JSX.Element
	image: string
	nameOfDish: string
	price: number
	description: string
}

export function CustomerMenuItemOverview(props: Props) {
	return (
		<>
			<StyledImageBox>
				<Image
					src={`https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket${props.image}`}
					alt="pizza"
					fill={true}
					objectFit="cover"
				/>
			</StyledImageBox>

			<StyledBox padding={2}>
				<Stack marginBottom={2}>
					<Typography variant="h6" fontWeight={600}>
						{props.nameOfDish}
					</Typography>
					<Typography fontWeight={600}>{props.price} ₸</Typography>
					<Typography paddingTop={1}>{props.description}</Typography>
				</Stack>
				{props.modificationsSlot}
			</StyledBox>
			{props.actionSlot}
		</>
	)
}
