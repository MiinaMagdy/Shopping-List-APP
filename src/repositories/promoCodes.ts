import { validPromoCodes } from '../database/db';
import { PromoCode, PromoCodeId } from '../models/PromoCode';
import { mapEntry } from '../utils/mapper';
import { v4 as uuidv4 } from 'uuid';

export const getAllPromoCodes = () => {
	return Array.from(validPromoCodes).map(mapEntry('name'));
};

export const getPromoCodeByName = (Name: string) => {
	const promoCode = validPromoCodes.get(Name);

	if (!promoCode) {
		return undefined;
	}

	return mapEntry('name')([Name, promoCode]);
};

export const hasPromoCodeWithName = (name: string) => {
	return validPromoCodes.has(name);
};

export const createPromoCode = (promoCode: PromoCode) => {
	if (validPromoCodes.has(promoCode.name)) {
		return undefined;
	}
	const id = uuidv4();
	const promoCodeMap: PromoCodeId = { id, percentage: promoCode.percentage };
	validPromoCodes.set(promoCode.name, promoCodeMap);
	return mapEntry('name')([promoCode.name, promoCodeMap]);
};

export const deletePromoCode = (name: string) => {
	const promoCode = validPromoCodes.get(name);

	if (!promoCode) {
		return undefined;
	}

	validPromoCodes.delete(name);
	return mapEntry('name')([name, promoCode]);
};
