import type { Middleware } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import { isRejectedWithValue } from '@reduxjs/toolkit';

interface ErrorPayload {
  data: { message: string };
}

function isErrorPayload(payload: unknown): payload is ErrorPayload {
  return payload && typeof payload.data.message === 'string';
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');

    const err = isErrorPayload(action.payload)
      ? (action.payload.data as { message: string }).message
      : action.error.message;
    toast.error(err);
  }

  return next(action);
};
