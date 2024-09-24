import { Router } from 'express';
import * as shoppingListController from '../controllers/shoppingList';
import validateResource from '../middlewares/validateResource';
import {
	addProductToShoppingListSchema,
	removeProductFromShoppingListSchema,
} from '../validators/shoppingList';

const router = Router();

router
	.route('/')
	.get(shoppingListController.getShoppingList)
	.post(
		validateResource(addProductToShoppingListSchema),
		shoppingListController.addProductToShoppingList,
	);

router
	.route('/:productId')
	.delete(
		validateResource(removeProductFromShoppingListSchema),
		shoppingListController.removeProductFromShoppingList,
	);

export default router;
