import { Request, Response, NextFunction } from 'express';
import * as promoCodesService from '../services/promoCodes';
import { PromoCodeBody, PromoCodeNameParams } from '../validators/promoCodes';

export const getAllPromoCodes = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const promoCodes = promoCodesService.getAllPromoCodes();
		res.status(200).json(promoCodes);
	} catch (error) {
		next(error);
	}
};

export const getPromoCodeByName = (
	req: Request<PromoCodeNameParams>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const promoCode = promoCodesService.getPromoCodeByName(req.params.name);
		res.status(200).json(promoCode);
	} catch (error) {
		next(error);
	}
};

export const addPromoCode = (
	req: Request<{}, {}, PromoCodeBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const promoCode = req.body;
		promoCodesService.addPromoCode(promoCode);
		res.status(201).json({ message: 'Promo code created' });
	} catch (error) {
		next(error);
	}
};

export const deletePromoCode = (
	req: Request<PromoCodeNameParams>,
	res: Response,
	next: NextFunction,
) => {
	try {
		promoCodesService.deletePromoCode(req.params.name);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
