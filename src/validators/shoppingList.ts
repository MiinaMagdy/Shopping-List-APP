import { z } from 'zod';

export const addProductToShoppingListSchema = z.object({
	body: z.object({
		productId: z.string().uuid(),
		quantity: z.number().int().positive(),
	}),
});

export const removeProductFromShoppingListSchema = z.object({
	params: z.object({
		productId: z.string().uuid(),
	}),
});

export type AddProductToShoppingListBody = z.infer<
	typeof addProductToShoppingListSchema
>['body'];
export type RemoveProductFromShoppingListParams = z.infer<
	typeof removeProductFromShoppingListSchema
>['params'];
