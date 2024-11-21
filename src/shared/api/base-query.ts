'use client';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

console.log(process.env.NEXT_PUBLIC_BASE_API);
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API,
  credentials: 'include',
});
