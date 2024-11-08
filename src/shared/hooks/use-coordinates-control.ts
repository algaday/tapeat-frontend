import { useContext } from 'react';

import { LngLat } from '@yandex/ymaps3-types';
import { useRouter } from 'next/navigation';

import { addAddressAction, fetchAddressByUri, fetchAddressGeocode } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { MapContext } from '@shared/providers';

export function useCoordinatesControl() {
  const context = useContext(MapContext);

  const deliveryType = useAppSelector((state) => state.user.deliveryOption);

  const dispatch = useAppDispatch();

  const router = useRouter();

  if (!context) {
    throw new Error('useCoordinatesControl must be used within a MapProvider');
  }

  const updateDeliveryCoordinates = (coordinates: LngLat) => {
    context.setLocationContent((state) => {
      state.deliveryAddress.coordinates = coordinates;
      return state;
    });
  };

  const updatePickupCoordinates = (coordinates: LngLat) => {
    context.setLocationContent((state) => {
      state.pickupAddress.coordinates = coordinates;
      return state;
    });
    console.log(context.locationContent);
  };

  const updateDeliveryAddress = (address: string) => {
    const modifiedDeliveryAddress = {
      ...context.locationContent.deliveryAddress,
      address: `Астана, ${address}`,
    };

    context.setLocationContent((locationContent) => {
      return { ...locationContent, deliveryAddress: modifiedDeliveryAddress };
    });
  };

  const updateDeliveryType = (type: 'delivery' | 'pick-up' | 'restaurant') => {
    context.setLocationContent((locationContent) => {
      return { ...locationContent, type };
    });
  };

  const updatePickupAddress = (address: string) => {
    const modifiedPickupAddress = {
      ...context.locationContent.pickupAddress,
      address: `Астана, ${address}`,
    };

    context.setLocationContent((locationContent) => {
      return { ...locationContent, pickupAddress: modifiedPickupAddress };
    });
  };

  const findAddressByCoordinates = async (lngLat: string) => {
    const { address } = await fetchAddressGeocode(lngLat);

    const modifiedCoordinates = lngLat.split(',').map((item) => Number(item)) as LngLat;

    updateDeliveryCoordinates(modifiedCoordinates);
    updateDeliveryAddress(address);
  };

  const findCoordinatesByUri = async (uri: string, address: string) => {
    const result = await fetchAddressByUri(uri);

    const modifiedCoordinates = result.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
      .split(' ')
      .map((item) => Number(item)) as LngLat;

    updateDeliveryCoordinates(modifiedCoordinates);
    updateDeliveryAddress(address);
  };

  const setApartmentAttributes = (name: string, value: string) => {
    const modifiedDeliveryAddress = {
      ...context.locationContent.deliveryAddress,
      [name]: value,
    };
    context.setLocationContent((locationContent) => {
      return { ...locationContent, deliveryAddress: modifiedDeliveryAddress };
    });
  };

  const submitDeliveryAddress = () => {
    const { address, coordinates, entrance, flat, floor } = context.locationContent.deliveryAddress;

    const modifiedCoordinates = coordinates.join(',');

    dispatch(
      addAddressAction({
        street: address,
        entrance,
        flat,
        floor,
        type: deliveryType,
        coordinates: modifiedCoordinates,
      }),
    );

    router.back();
  };

  const submitPickupAddress = () => {
    const { address, coordinates } = context.locationContent.pickupAddress;

    const modifiedCoordinates = coordinates.join(',');

    dispatch(
      addAddressAction({
        street: address,
        type: deliveryType,
        coordinates: modifiedCoordinates,
      }),
    );

    router.back();
  };

  return {
    updatePickupAddress,
    locationContent: context.locationContent,
    findAddressByCoordinates,
    findCoordinatesByUri,
    setApartmentAttributes,
    updateDeliveryType,
    submitDeliveryAddress,
    submitPickupAddress,
    updatePickupCoordinates,
  };
}
