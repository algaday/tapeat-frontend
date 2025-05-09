import { SuggestApiResponse } from './types';

export const fetchSuggestions = async (address: string) => {
  const url = 'https://suggest-maps.yandex.ru/v1/suggest';

  const params = new URLSearchParams({
    apikey: process.env.suggestApiKey as string,
    text: address,
    bbox: '70.979071,51.072840~71.792170,51.211011',
    strict_bounds: '1',
    lang: 'ru',
    attrs: 'uri',
    results: '4',
  });

  const response = await fetch(`${url}?${params.toString()}`);

  const data: SuggestApiResponse = await response.json();

  return data.results;
};
