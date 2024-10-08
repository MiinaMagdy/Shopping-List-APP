import { Product } from '../models/Product';
import { v4 as uuidv4 } from 'uuid';
import { mapEntry } from '../utils/mapper';
import { availableProducts } from '../database/db';

export const getAllProducts = () => {
	// Convert the Map to an array of products using the mapEntry function
	return Array.from(availableProducts).map(mapEntry());
};

export const getProductById = (id: string) => {
	const product = availableProducts.get(id);

	// If the product is not found, return undefined
	if (!product) {
		return undefined;
	}

	return mapEntry()([id, product]);
};

export const hasProduct = (id: string) => {
	return availableProducts.has(id);
};

export const createProduct = (product: Product) => {
	// Generate a unique ID for the product
	const id = uuidv4();

	availableProducts.set(id, product);
	return mapEntry()([id, product]);
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
	return mapEntry()([id, updatedProduct]);
};

export const deleteProduct = (id: string) => {
	const product = availableProducts.get(id);

	// If the product is not found, return undefined
	if (!product) {
		return undefined;
	}

	availableProducts.delete(id);
	return mapEntry()([id, product]);
};
