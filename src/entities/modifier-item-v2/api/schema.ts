import { ModifierItemV2 } from '../model/schema';

export type GetModifierItemByMenuItemIdResponse = ModifierItemV2[];
export type GetModifierItemByMenuItemIdRequest = {
  menuItemId: string;
};
