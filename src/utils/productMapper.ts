import { Product } from '../models/Product';

type ProductMap = [string, Product];

// Convert the ProductMap tuple to a Product object to get the ID and product properties
export const mapProduct = ([id, product]: ProductMap) => ({
	id,
	...product,
});
