import { z } from 'zod';

/*
 * The promoCodeSchema is an object with two properties:
 * - name: a string with at least 2 characters and at most 255 characters that only contains uppercase letters and numbers.
 * - percentage: a number between 0 and 1.
 */
const promoCodeSchema = z.object({
	name: z
		.string()
		.min(2)
		.max(255)
		.regex(
			/^[A-Z0-9_]+$/,
			'Name must only contain uppercase letters and numbers.',
		),
	percentage: z.number().min(0).max(1),
});

export const createPromoCodeSchema = z.object({
	body: promoCodeSchema,
});

export const promoCodeNameSchema = z.object({
	params: z.object({
		name: promoCodeSchema.shape.name,
	}),
});

export type PromoCodeBody = z.infer<typeof promoCodeSchema>;
export type PromoCodeNameParams = z.infer<typeof promoCodeNameSchema>['params'];
