import { PromoCode } from '../models/PromoCode';
import * as promoCodesRepository from '../repositories/promoCodes';
import { ConflictException, NotFoundException } from '../utils/HttpException';

export const getAllPromoCodes = () => {
	return promoCodesRepository.getAllPromoCodes();
};

export const getPromoCodeByName = (name: string) => {
	const promoCode = promoCodesRepository.getPromoCodeByName(name);

	if (!promoCode) {
		throw new NotFoundException(`Promo code with name ${name} not found`);
	}

	return promoCode;
};

export const hasPromoCodeWithName = (name: string) => {
	return promoCodesRepository.hasPromoCodeWithName(name);
};

export const addPromoCode = (promoCodeEntry: PromoCode) => {
	const promoCode = promoCodesRepository.createPromoCode(promoCodeEntry);
	if (!promoCode) {
		throw new ConflictException(
			`Promo code with name ${promoCodeEntry.name} already exists`,
		);
	}
	return promoCode;
};

export const deletePromoCode = (name: string) => {
	const deletedPromoCode = promoCodesRepository.deletePromoCode(name);

	if (!deletedPromoCode) {
		throw new NotFoundException(`Promo code with name ${name} not found`);
	}

	return deletedPromoCode;
};

export const calculateDiscountedPrice = (price: number, promoCode: string) => {
	if (!hasPromoCodeWithName(promoCode)) {
		return price;
	}
	const promoCodeData = getPromoCodeByName(promoCode);
	return price * (1 - promoCodeData.percentage);
};
