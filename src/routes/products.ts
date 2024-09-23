import { Router } from 'express';
import * as productsController from '../controllers/products';
import validateResource from '../middlewares/validateResource';
import {
	productIdSchema,
	createProductSchema,
	updateProductSchema,
} from '../validators/products';

const router = Router();

router
	.route('/')
	.get(productsController.getAllProducts)
	.post(
		validateResource(createProductSchema),
		productsController.createProduct,
	);

router
	.route('/:id')
	.get(validateResource(productIdSchema), productsController.getProductById)
	.patch(
		validateResource(updateProductSchema),
		productsController.updateProduct,
	)
	.delete(validateResource(productIdSchema), productsController.deleteProduct);

export default router;
