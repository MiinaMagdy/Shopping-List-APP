import { Router } from 'express';
import * as shoppingListController from '../controllers/shoppingList';
import validateResource from '../middlewares/validateResource';
import {
	addProductToShoppingListSchema,
	removeProductFromShoppingListSchema,
} from '../validators/shoppingList';
import { promoCodeNameSchema } from '../validators/promoCodes';

const router = Router();

router
	.route('/')
	.get(shoppingListController.getShoppingList)
	.post(
		validateResource(addProductToShoppingListSchema),
		shoppingListController.addProductToShoppingList,
	);

router.route('/promocodes').delete(shoppingListController.removePromoCode);

router
	.route('/promocodes/:name')
	.post(
		validateResource(promoCodeNameSchema),
		shoppingListController.applyPromoCode,
	);

router
	.route('/:productId')
	.delete(
		validateResource(removeProductFromShoppingListSchema),
		shoppingListController.removeProductFromShoppingList,
	);

export default router;
