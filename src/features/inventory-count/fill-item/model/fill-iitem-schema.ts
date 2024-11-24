import { z } from 'zod';

export const fillItemSchema = z.object({
  quantity: z.preprocess(
    (val) => {
      // Ensure val is a string, replace commas with dots
      if (typeof val === 'string') {
        const sanitizedVal = val.replace(',', '.'); // Replace commas with dots
        return sanitizedVal.trim(); // Return sanitized string
      }
      return val; // Return as is if not a string
    },
    z.string().refine(
      (val) => {
        if (!/^\d*\.?\d+$/.test(val)) return false; // Ensure it only contains valid numeric characters
        if (/^0\d+/.test(val)) return false; // Reject numbers with leading zeros before a decimal point (e.g., "01.5")

        const num = Number(val); // Convert to number
        return !isNaN(num) && num >= 0; // Ensure the number is valid and non-negative
      },
      {
        message: 'Введите правильное число (0 или больше), без недопустимых символов',
      },
    ),
  ),
});

export type FillItemSchema = z.infer<typeof fillItemSchema>;
