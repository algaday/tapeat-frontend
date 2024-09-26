'use client'

import { useEffect, useState } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { LngLat } from '@yandex/ymaps3-types'
import Image from 'next/image'

import { useGetBranchesQuery } from '@entities/restaurant-branch'
import { useCoordinatesControl } from '@shared/hooks'
import { useAppSelector } from '@shared/lib/store'

import { loadYandexMapModules, ModuleType } from '../lib/load-map'
import {
	StyledIcon,
	StyledIconButton,
	StyledStack,
	Wrapper,
} from './display-map.styles'

export default function DisplayLocationMap() {
	const { locationContent, findAddressByCoordinates } =
		useCoordinatesControl()
	const { data: pickupBranches, isLoading } = useGetBranchesQuery()

	const tabType = useAppSelector((state) => state.user.deliveryOption)

	const [modules, setModules] = useState<ModuleType | null>(null)

	useEffect(() => {
		async function initializeModules() {
			const loadedModules = await loadYandexMapModules()
			setModules(loadedModules)
		}

		initializeModules()
	}, [])

	if (!modules) {
		return (
			<StyledStack alignItems="center" justifyContent="center">
				<CircularProgress />
			</StyledStack>
		)
	}

	const { YMapZoomControl, module } = modules

	const {
		YMap,
		YMapDefaultSchemeLayer,
		YMapDefaultFeaturesLayer,
		YMapListener,
		YMapMarker,
		YMapControls,
	} = module

	const handleActionEnd = (data: any) => {
		const centerCoordinate = data.location.center.join(',')
		findAddressByCoordinates(centerCoordinate)
	}

	return (
		<Wrapper>
			<YMap
				location={{
					center:
						tabType === 'delivery'
							? locationContent.deliveryAddress.coordinates
							: locationContent.pickupAddress.coordinates,
					zoom: 16,
				}}
				mode="vector"
				behaviors={['drag']}
			>
				<YMapDefaultSchemeLayer />

				<YMapControls position="right">
					{/* Add the first zoom control to the map */}
					<YMapZoomControl />
				</YMapControls>

				<YMapDefaultFeaturesLayer />
				{tabType === 'delivery' && (
					<YMapListener onActionEnd={handleActionEnd} />
				)}
				{(tabType === 'pick-up' || tabType === 'restaurant') &&
					pickupBranches?.map((branch) => {
						const coordindates = [
							Number(branch.longitude),
							Number(branch.latitude),
						]
						return (
							<YMapMarker
								coordinates={coordindates as LngLat}
								key={branch.id}
							>
								<Box sx={{ transform: 'translate(-50%,-25%)' }}>
									<Image
										src="https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket/restaurants/f8fea128-4b37-4d39-ba8e-8845945d9844/menu/3b7636a4-a5d4-463a-b4b5-c71e11f70bec.webp"
										alt="hello"
										width={50}
										height={50}
										onClick={() => console.log('click')}
									/>
								</Box>
							</YMapMarker>
						)
					})}

				{tabType === 'delivery' && (
					<StyledIconButton>
						<StyledIcon />
					</StyledIconButton>
				)}
			</YMap>
		</Wrapper>
	)
}
