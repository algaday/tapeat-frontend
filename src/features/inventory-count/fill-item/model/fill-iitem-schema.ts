import { z } from 'zod';

export const fillItemSchema = z.object({
  quantity: z.string().refine((val) => /^(0|[1-9][0-9]*)$/.test(val), {
    message: 'Введите правильное число без ведущих нулей и без отрицательных значений',
  }),
});

export type FillItemSchema = z.infer<typeof fillItemSchema>;
