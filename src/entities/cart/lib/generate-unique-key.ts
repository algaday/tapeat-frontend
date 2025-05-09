import { MenuItem } from '../model/types';

export function generateUniqueKey(item: MenuItem): string {
  return `${item.id}-${JSON.stringify(item.modifications)}`;
}
