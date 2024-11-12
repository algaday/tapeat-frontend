import { z } from 'zod';

export const fillItemSchema = z.object({
  quantity: z
    .string()
    .refine((val) => parseInt(val) > 0, { message: 'Количество должно быть больше нуля' }),
});

export type FillItemSchema = z.infer<typeof fillItemSchema>;
