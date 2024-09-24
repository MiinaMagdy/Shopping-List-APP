import { Product } from './Product';

export interface ShoppingList extends Product {
	quantity: number;
}
