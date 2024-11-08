'use client';

import { useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { LngLat } from '@yandex/ymaps3-types';
import Image from 'next/image';

import { testData } from '@features/map/select-pickup/ui/select-pickup';
import { useCoordinatesControl } from '@shared/hooks';
import { useAppSelector } from '@shared/lib/store';

import { loadYandexMapModules, ModuleType } from '../lib/load-map';
import { StyledIcon, StyledIconButton, StyledStack, Wrapper } from './display-map.styles';

export function DisplayLocationMap() {
  const { locationContent, findAddressByCoordinates } = useCoordinatesControl();

  const tabType = useAppSelector((state) => state.user.deliveryOption);

  const [modules, setModules] = useState<ModuleType | null>(null);

  useEffect(() => {
    async function initializeModules() {
      const loadedModules = await loadYandexMapModules();
      setModules(loadedModules);
    }

    initializeModules();
  }, []);

  if (!modules) {
    return (
      <StyledStack alignItems="center" justifyContent="center">
        <CircularProgress />
      </StyledStack>
    );
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapMarker } =
    modules;

  const handleActionEnd = (data) => {
    const centerCoordinate = data.location.center.join(',');
    findAddressByCoordinates(centerCoordinate);
  };

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
        <YMapDefaultFeaturesLayer />
        {tabType === 'delivery' && <YMapListener onActionEnd={handleActionEnd} />}
        {(tabType === 'pick-up' || tabType === 'restaurant') &&
          testData.map((data) => (
            <YMapMarker coordinates={data.coordinates as LngLat} key={data.id}>
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
          ))}

        {tabType === 'delivery' && (
          <StyledIconButton>
            <StyledIcon />
          </StyledIconButton>
        )}
      </YMap>
    </Wrapper>
  );
}
