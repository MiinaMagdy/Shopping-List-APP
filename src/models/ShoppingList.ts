import { Product } from './Product';

export interface ShoppingListItem extends Product {
	quantity: number;
}

export interface ShoppingList {
	items: Map<string, number>;
	appliedPromoCode?: string;
}
