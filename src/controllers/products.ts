import { Request, Response, NextFunction } from 'express';
import * as productsService from '../services/products';
import {
	CreateProductBody,
	ProductIdParams,
	UpdateProductBody,
} from '../validators/products';

export const getAllProducts = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = productsService.getAllProducts();
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

export const getProductById = (
	req: Request<ProductIdParams>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const product = productsService.getProductById(req.params.id);
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};

export const createProduct = (
	req: Request<{}, {}, CreateProductBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const product = productsService.createProduct(req.body);
		res.status(201).json(product);
	} catch (error) {
		next(error);
	}
};

export const updateProduct = (
	req: Request<ProductIdParams, {}, UpdateProductBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const product = productsService.updateProduct(req.params.id, req.body);
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = (
	req: Request<ProductIdParams>,
	res: Response,
	next: NextFunction,
) => {
	try {
		productsService.deleteProduct(req.params.id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
