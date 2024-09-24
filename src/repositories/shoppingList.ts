import { shoppingList } from '../database/db';

export const getShoppingList = () => {
	return Array.from(shoppingList);
};

export const addProductToShoppingList = (
	productId: string,
	quantity: number,
) => {
	const currentQuantity = shoppingList.get(productId) || 0;
	shoppingList.set(productId, currentQuantity + quantity);
};

export const removeProductFromShoppingList = (productId: string) => {
	const quantity = shoppingList.get(productId);

	if (quantity === undefined) {
		return false;
	}

	shoppingList.delete(productId);
	return quantity;
};
