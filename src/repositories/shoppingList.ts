import { shoppingList } from '../database/db';

export const getShoppingList = () => {
	return Array.from(shoppingList.items);
};

export const addProductToShoppingList = (
	productId: string,
	quantity: number,
) => {
	const currentQuantity = shoppingList.items.get(productId) || 0;
	shoppingList.items.set(productId, currentQuantity + quantity);
};

export const removeProductFromShoppingList = (productId: string) => {
	const quantity = shoppingList.items.get(productId);

	if (quantity === undefined) {
		return false;
	}

	shoppingList.items.delete(productId);
	return quantity;
};

export const getPromoCode = () => {
	return shoppingList.appliedPromoCode;
};

export const updatePromoCode = (promoCode: string) => {
	shoppingList.appliedPromoCode = promoCode;
};

export const removePromoCode = () => {
	shoppingList.appliedPromoCode = undefined;
};
