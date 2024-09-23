import { z } from 'zod';

export const createProductSchema = z.object({
	body: z.object({
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters long.' }),
		price: z.number().positive(),
		quantity: z.number().positive().int(),
	}),
});

export const productIdSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
});

export const updateProductSchema = z
	.object({
		body: z.object({
			name: z
				.string()
				.min(2, { message: 'Name must be at least 2 characters long.' })
				.optional(),
			price: z.number().positive().optional(),
			quantity: z.number().positive().int().optional(),
		}),
	})
	.merge(productIdSchema);

export type UpdateProductBody = z.infer<typeof updateProductSchema>['body'];
export type UpdateProductParams = z.infer<typeof updateProductSchema>['params'];
export type CreateProductBody = z.infer<typeof createProductSchema>['body'];
export type ProductIdParams = z.infer<typeof productIdSchema>['params'];
