import { z } from 'zod';

export const productSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters long.' }),
	price: z.number().positive(),
	stock: z.number().nonnegative().int(),
});

export const createProductSchema = z.object({
	body: productSchema,
});

export const productIdSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
});

export const updateProductSchema = z
	.object({
		body: productSchema.partial(),
	})
	.merge(productIdSchema);

export type UpdateProductBody = z.infer<typeof updateProductSchema>['body'];
export type UpdateProductParams = z.infer<typeof updateProductSchema>['params'];
export type CreateProductBody = z.infer<typeof createProductSchema>['body'];
export type ProductIdParams = z.infer<typeof productIdSchema>['params'];
