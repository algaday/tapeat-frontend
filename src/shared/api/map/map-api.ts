import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GeocodeResponse, SuggestApiResponse } from './types';

export const mapApi = createApi({
  reducerPath: 'mapApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),

  endpoints: (builder) => ({
    findAddress: builder.query<GeocodeResponse, string>({
      query: (address) => ({
        url: 'https://geocode-maps.yandex.ru/1.x/',
        params: {
          apikey: process.env.geoApiKey,
          geocode: address,
          kind: 'house',
          format: 'json',
        },
      }),
    }),

    findLocation: builder.query<GeocodeResponse, string>({
      query: (uri) => ({
        url: 'https://geocode-maps.yandex.ru/1.x/',
        params: {
          apikey: process.env.geoApiKey,
          uri,
          format: 'json',
        },
      }),
    }),

    suggestAddress: builder.query<SuggestApiResponse, string>({
      query: (address) => ({
        url: 'https://suggest-maps.yandex.ru/v1/suggest',
        params: {
          apikey: process.env.suggestApiKey,
          text: address,
          bbox: '70.979071,51.072840~71.792170,51.211011',
          strict_bounds: '1',
          lang: 'ru',
          attrs: 'uri',
          results: '4',
        },
      }),
    }),
  }),
});

export const { useFindAddressQuery, useSuggestAddressQuery } = mapApi;
