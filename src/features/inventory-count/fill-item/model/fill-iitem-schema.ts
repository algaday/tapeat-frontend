import { z } from 'zod';

export const fillItemSchema = z.object({
  quantity: z.string().refine(
    (val) => {
      const parsed = parseInt(val, 10);
      return !isNaN(parsed) && parsed >= 0; // Ensure valid number and 0 or greater
    },
    { message: 'Количество должно быть 0 или больше' },
  ),
  // .transform((val) => (parseInt(val, 10) === 0 ? '0' : val)), // Transform 0 to "0" string
});

export type FillItemSchema = z.infer<typeof fillItemSchema>;
