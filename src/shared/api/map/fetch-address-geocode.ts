import { GeocodeResponse } from './types';

export const fetchAddressGeocode = async (coordinates: string) => {
  const url = 'https://geocode-maps.yandex.ru/1.x/';

  const params = new URLSearchParams({
    apikey: process.env.geoApiKey as string,
    geocode: coordinates,
    kind: 'house',
    format: 'json',
  });

  const response = await fetch(`${url}?${params.toString()}`);

  const data: GeocodeResponse = await response.json();

  const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.name;

  return {
    address,
  };
};
