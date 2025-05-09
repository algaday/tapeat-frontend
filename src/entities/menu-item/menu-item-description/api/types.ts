import { z } from 'zod';

export const modificationGroupSchema = z.object({
  id: z.string(),
  isMultipleChoice: z.boolean(),
  name: z.string(),
  modifications: z.array(
    z.object({
      id: z.string(),
      modificationGroupId: z.string(),
      name: z.string(),
      price: z.string(),
      isMandatory: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
});

export const menuItemSchema = z.object({
  id: z.string(),
  category: z.string(),
  description: z.string(),
  nameOfDish: z.string(),
  price: z.number(),
  restaurantId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  image: z.object({
    imageId: z.string(),
    restaurantId: z.string(),
    originalPath: z.string(),
    mediumThumbnailPath: z.string(),
    smallThumbnailPath: z.string(),
  }),
  modificationGroups: z.array(modificationGroupSchema),
});

export type MenuItemSchema = z.infer<typeof menuItemSchema>;

export type ModificationGroupSchema = z.infer<typeof modificationGroupSchema>;

export type MenuItem = Omit<MenuItemSchema, 'modificationGroups'> & {
  modifications: Modification[];
};

type Modification = {
  id: string;
  price: number;
};
