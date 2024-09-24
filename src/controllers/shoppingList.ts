import { Request, Response, NextFunction } from 'express';
import * as shoppingListService from '../services/shoppingList';
import * as productsService from '../services/products';
import { ShoppingList } from '../models/ShoppingList';
import {
	AddProductToShoppingListBody,
	RemoveProductFromShoppingListParams,
} from '../validators/shoppingList';

export const getShoppingList = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const shoppingListPair = shoppingListService.getShoppingList();
		let totalPrice = 0;
		const shoppingList: ShoppingList[] = shoppingListPair
			.filter(([productId]) => {
				// if the product does not exist, remove it from the shopping list (Lazy deletion)
				if (!productsService.hasProduct(productId)) {
					shoppingListService.removeProductFromShoppingList(productId);
					return false;
				}
				return true;
			})
			.map(([productId, quantity]) => {
				// Get the product by its ID, and return an object with the product and the quantity
				const product = productsService.getProductById(productId);
				totalPrice += product.price * quantity;
				return {
					...product,
					quantity,
				};
			});
		totalPrice = Math.round(totalPrice * 100) / 100;
		res.status(200).json({ shoppingList, totalPrice });
	} catch (error) {
		next(error);
	}
};

export const addProductToShoppingList = (
	req: Request<{}, {}, AddProductToShoppingListBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { productId, quantity } = req.body;
		productsService.changeStock(productId, -quantity);
		shoppingListService.addProductToShoppingList(productId, quantity);
		res.status(201).json({ message: 'Product added to shopping list' });
	} catch (error) {
		next(error);
	}
};

export const removeProductFromShoppingList = (
	req: Request<RemoveProductFromShoppingListParams>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { productId } = req.params;
		const quantity =
			shoppingListService.removeProductFromShoppingList(productId);
		productsService.changeStock(productId, +quantity);
		res.status(200).json({ message: 'Product removed from shopping list' });
	} catch (error) {
		next(error);
	}
};
