import { z } from 'zod';

const choice = z.union([z.boolean(), z.string()]);

export const modificationChangeSchema = z.object({
  isMultipleChoice: choice.pipe(
    z.coerce
      .string()
      .toLowerCase()
      .transform((x) => x === 'true')
      .pipe(z.boolean()),
  ),
});

export type ModificationChangeSchema = z.infer<typeof modificationChangeSchema>;
