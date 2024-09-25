import { Router } from 'express';
import * as promoCodesController from '../controllers/promoCodes';
import validateResource from '../middlewares/validateResource';
import {
	createPromoCodeSchema,
	promoCodeNameSchema,
} from '../validators/promoCodes';

const router = Router();

router
	.route('/')
	.get(promoCodesController.getAllPromoCodes)
	.post(
		validateResource(createPromoCodeSchema),
		promoCodesController.addPromoCode,
	);

router
	.route('/:name')
	.get(
		validateResource(promoCodeNameSchema),
		promoCodesController.getPromoCodeByName,
	)
	.delete(
		validateResource(promoCodeNameSchema),
		promoCodesController.deletePromoCode,
	);

export default router;
