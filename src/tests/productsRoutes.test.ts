import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { Product } from '../models/Product';
import app from '../app';
import { z } from 'zod';

const uuidSchema = z.string().uuid();

describe('GET /api/products', () => {
	it('should return an empty array', async () => {
		// Arrange
		const emptyArray: Product[] = [];

		// Act
		const response = await request(app).get('/api/products');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toEqual(emptyArray);
		expect(response.body).toHaveLength(0);
	});
});

describe('POST /api/products', () => {
	it('should add a product', async () => {
		// Arrange
		const product: Product = {
			name: 'Product 1',
			price: 10,
			stock: 10,
		};

		// Act
		const response = await request(app).post('/api/products').send(product);

		// Assert
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
		expect(uuidSchema.safeParse(response.body.id).success).toBe(true);
		expect(response.body).toMatchObject(product);
	});

	it('should return a 422 error if the product is invalid', async () => {
		// Arrange
		const product: Product = {
			name: 'P',
			price: -10,
			stock: -10,
		};
		const errors = [
			'body.name Name must be at least 2 characters long.',
			'body.price Number must be greater than 0',
			'body.stock Number must be greater than or equal to 0',
		];

		// Act
		const response = await request(app).post('/api/products').send(product);

		// Assert
		expect(response.status).toBe(422);
		expect(response.body).toHaveProperty('message');
		expect(response.body.status).toBe('fail');
		expect(response.body.errors).toEqual(errors);
	});
});
