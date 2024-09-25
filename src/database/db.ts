import { Product } from '../models/Product';
import { PromoCodeId } from '../models/PromoCode';
import { ShoppingList } from '../models/ShoppingList';

export const availableProducts = new Map<string, Product>();
export const shoppingList: ShoppingList = {
	items: new Map<string, number>(),
};
export const validPromoCodes = new Map<string, PromoCodeId>();
