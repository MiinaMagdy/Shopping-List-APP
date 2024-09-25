import * as shoppingListRepository from '../repositories/shoppingList';
import { NotFoundException } from '../utils/HttpException';

export const getShoppingList = () => {
	return shoppingListRepository.getShoppingList();
};

export const addProductToShoppingList = (
	productId: string,
	quantity: number,
) => {
	shoppingListRepository.addProductToShoppingList(productId, quantity);
};

export const removeProductFromShoppingList = (productId: string) => {
	const quantity =
		shoppingListRepository.removeProductFromShoppingList(productId);
	if (!quantity) {
		throw new NotFoundException(`Product with id ${productId} not found`);
	}
	return quantity;
};

export const applyPromoCode = (promoCode: string) => {
	return shoppingListRepository.updatePromoCode(promoCode);
};

export const removePromoCode = () => {
	return shoppingListRepository.removePromoCode();
};

export const getPromoCode = () => {
	return shoppingListRepository.getPromoCode();
};
