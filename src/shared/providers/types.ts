import { Dispatch, ReactNode, SetStateAction } from 'react';

import { LngLat } from '@yandex/ymaps3-types';

export type Props = { children: ReactNode };

export type LocationContent = {
  deliveryAddress: DeliveryAddress;
  pickupAddress: PickupAddress;
  type: 'delivery' | 'pick-up' | 'restaurant';
};

type DeliveryAddress = {
  coordinates: LngLat;
  address: string;
  flat?: string;
  floor?: string;
  entrance?: string;
};

type PickupAddress = {
  coordinates: LngLat;
  address: string;
};

export type ContextType = {
  locationContent: LocationContent;
  setLocationContent: Dispatch<SetStateAction<LocationContent>>;
};
