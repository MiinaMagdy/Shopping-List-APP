import { Router } from 'express';
import productRouter from './products';
import shoppingListRouter from './shoppingList';

const router = Router();

router.use('/products', productRouter);
router.use('/shopping-list', shoppingListRouter);

export default router;
