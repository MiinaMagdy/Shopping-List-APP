import { Router } from 'express';
import productRouter from './products';
import shoppingListRouter from './shoppingList';
import promoCodeRouter from './promoCodes';

const router = Router();

router.use('/products', productRouter);
router.use('/shopping-list', shoppingListRouter);
router.use('/promocodes', promoCodeRouter);

export default router;
