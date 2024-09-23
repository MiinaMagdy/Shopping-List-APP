import { Product } from '../models/Product';
import { v4 as uuidv4 } from 'uuid';
import { mapProduct } from '../utils/productMapper';

const availableProducts = new Map<string, Product>();

export const getAllProducts = () => {
	// Convert the Map to an array of products using the mapProduct function
	return Array.from(availableProducts).map(mapProduct);
};

export const getProductById = (id: string) => {
	const product = availableProducts.get(id);

	// If the product is not found, return undefined
	if (!product) {
		return undefined;
	}

	return mapProduct([id, product]);
};

export const createProduct = (product: Product) => {
	// Generate a unique ID for the product
	const id = uuidv4();

	availableProducts.set(id, product);
	return mapProduct([id, product]);
};

export const updateProduct = (id: string, product: Partial<Product>) => {
	const existingProduct = availableProducts.get(id);

	// If the product is not found, return undefined
	if (!existingProduct) {
		return undefined;
	}

	// Merge the existing product with the updated product
	const updatedProduct = { ...existingProduct, ...product };

	availableProducts.set(id, updatedProduct);
	return mapProduct([id, updatedProduct]);
};

export const deleteProduct = (id: string) => {
	const product = availableProducts.get(id);

	// If the product is not found, return undefined
	if (!product) {
		return undefined;
	}

	availableProducts.delete(id);
	return mapProduct([id, product]);
};
