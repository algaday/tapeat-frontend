/* eslint-disable no-param-reassign */
import { MenuItem } from './types';

export function calculateMenuTotalWithQuantity(menuItem: MenuItem) {
  return (
    menuItem.price * menuItem.quantity +
    menuItem.modifications.reduce((total, item) => (total += item.price), 0)
  );
}
export function calculateMenuTotal(menuItem: MenuItem) {
  const { price } = menuItem;

  return (
    Number(price) + menuItem.modifications.reduce((total, item) => (total += Number(item.price)), 0)
  );
}
