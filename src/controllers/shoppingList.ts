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
		// Check if the product exists and if there is enough stock, then add the product to the shopping list
		productsService.changeStock(productId, -quantity);
		// If the product is already in the shopping list, add the quantity to the existing quantity
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
		// Remove the product from the shopping list and return the quantity, if the product is not found, throw a NotFoundException
		const quantity =
			shoppingListService.removeProductFromShoppingList(productId);
		// Add the quantity back to the stock
		productsService.changeStock(productId, +quantity);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
