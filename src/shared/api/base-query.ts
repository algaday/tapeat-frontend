import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.baseApi,
  credentials: 'include',
});

export const baseV2Query = fetchBaseQuery({
  baseUrl: process.env.baseV2Api,
  credentials: 'include',
});
