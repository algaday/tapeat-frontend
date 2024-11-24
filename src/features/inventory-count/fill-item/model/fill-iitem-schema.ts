import { z } from 'zod';

export const fillItemSchema = z.object({
  quantity: z.string().refine(
    (val) => {
      const sanitizedVal = val.replace(',', '.'); // Replace commas with dots
      if (!/^\d*\.?\d+$/.test(sanitizedVal)) return false; // Ensure it only contains valid numeric characters
      if (/^0\d+/.test(sanitizedVal)) return false; // Reject numbers with leading zeros before a decimal point (e.g., "01.5")
      if (/^0\d/.test(sanitizedVal) && !sanitizedVal.includes('.')) return false; // Reject numbers like "0001" without decimals
      const num = Number(sanitizedVal); // Convert to number
      return !isNaN(num) && num >= 0; // Ensure the number is valid and non-negative
    },
    {
      message: 'Введите правильное число (0 или больше), без недопустимых нулей или символов',
    },
  ),
});

export type FillItemSchema = z.infer<typeof fillItemSchema>;
