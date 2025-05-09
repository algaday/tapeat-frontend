import { IngredientUnit } from '@shared/constants';

export const translateUnit = (unit: IngredientUnit): string => {
  switch (unit) {
    case 'litre':
      return 'литр';
    case 'ml':
      return 'мл';
    case 'kg':
      return 'кг';
    case 'g':
      return 'грамм';
    case 'piece':
      return 'штук';
    case 'pack':
      return 'пачка';
    default:
      return unit;
  }
};
