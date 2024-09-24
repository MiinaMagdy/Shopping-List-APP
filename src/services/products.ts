import { Product } from '../models/Product';
import * as productsRepository from '../repositories/products';
import { BadRequestException, NotFoundException } from '../utils/HttpException';

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

export const hasProduct = (id: string) => {
	return productsRepository.hasProduct(id);
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

export const changeStock = (id: string, deltaQuantity: number) => {
	const product = productsRepository.getProductById(id);

	// If the product is not found, throw a NotFoundException
	if (!product) {
		throw new NotFoundException(`Product with id ${id} not found`);
	}
	if (product.stock + deltaQuantity < 0) {
		throw new BadRequestException('Not enough stock');
	}

	const updatedProduct = productsRepository.updateProduct(id, {
		stock: product.stock + deltaQuantity,
	});

	return updatedProduct;
};
