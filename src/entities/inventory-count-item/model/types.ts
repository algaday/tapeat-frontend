import { IngredientUnit } from '@shared/constants';

export interface Ingredient {
  name: string;
  quantity: number | null;
  unit: IngredientUnit;
  type: string;
}
