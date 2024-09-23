import { Product } from '../models/Product';
import * as productsRepository from '../repositories/products';
import { NotFoundException } from '../utils/HttpException';

export const getAllProducts = () => {
	return productsRepository.getAllProducts();
};

export const getProductById = (id: string) => {
	const product = productsRepository.getProductById(id);

	// If the product is not found, throw a NotFoundException
	if (!product) {
		throw new NotFoundException(`Product with id ${id} not found`);
	}

	return product;
};

export const createProduct = (productEntry: Product) => {
	return productsRepository.createProduct(productEntry);
};

export const updateProduct = (id: string, product: Partial<Product>) => {
	const updatedProduct = productsRepository.updateProduct(id, product);

	// If the product is not found, throw a NotFoundException
	if (!updatedProduct) {
		throw new NotFoundException(`Product with id ${id} not found`);
	}

	return updatedProduct;
};

export const deleteProduct = (id: string) => {
	const deletedProduct = productsRepository.deleteProduct(id);

	// If the product is not found, throw a NotFoundException
	if (!deletedProduct) {
		throw new NotFoundException(`Product with id ${id} not found`);
	}
};
