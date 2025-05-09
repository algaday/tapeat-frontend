'use client';

import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

let createImageDto: z.ZodType<File>;

if (typeof window !== 'undefined') {
  createImageDto = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 3MB')
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), 'File must be a PNG');
} else {
  createImageDto = z.any(); // или вообще не использовать на сервере
}
export const ImageSchema = z.object({
  id: z.string(),
  restaurantId: z.string(),
  originalPath: z.string(),
  mediumThumbnailPath: z.string(),
  smallThumbnailPath: z.string(),
  isAssigned: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateImageDto = z.infer<typeof createImageDto>;

export type Image = z.infer<typeof ImageSchema>;
