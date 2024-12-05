import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface ErrorPayload {
  data: { message: string };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorPayload(payload: any): payload is ErrorPayload {
  return (
    payload &&
    typeof payload === 'object' &&
    payload.data &&
    typeof payload.data === 'object' &&
    typeof payload.data.message === 'string'
  );
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');

    const err = isErrorPayload(action.payload)
      ? action.payload.data.message
      : action.error?.message || 'Unknown error';

    toast.error(err);
  }

  return next(action);
};
