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

describe('GET /api/products/:id', () => {
	it('should return a product', async () => {
		// Arrange
		const products = await request(app).get('/api/products');
		const productId = products.body[0].id;

		// Act
		const response = await request(app).get(`/api/products/${productId}`);

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject(products.body[0]);
	});

	it('should return a 422 error if the productId is invalid uuid', async () => {
		// Arrange
		const productId = 'invalid-uuid';

		// Act
		const response = await request(app).get(`/api/products/${productId}`);

		// Assert
		expect(response.status).toBe(422);
	});

	it('should return a 404 error if the product does not exist', async () => {
		// Arrange
		const productId = '00000000-0000-0000-0000-000000000000';

		// Act
		const response = await request(app).get(`/api/products/${productId}`);

		// Assert
		expect(response.status).toBe(404);
	});
});

describe('GET /api/products/', () => {
	it('should return an array with one product', async () => {
		// Arrange
		const product: Product = {
			name: 'Product 1',
			price: 10,
			stock: 10,
		};

		// Act
		const response = await request(app).get('/api/products');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toMatchObject(product);
	});
});

describe('PATCH /api/products/:id', () => {
	it('should update a product', async () => {
		// Arrange
		const products = await request(app).get('/api/products');
		const productId = products.body[0].id;

		// Act
		const response = await request(app)
			.patch(`/api/products/${productId}`)
			.send({ price: 20 });

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({ price: 20 });
		expect(response.body).toHaveProperty('id');
	});

	it('should return a 422 error if the product is invalid', async () => {
		// Arrange
		const products = await request(app).get('/api/products');
		const productId = products.body[0].id;
		const product = {
			price: -10,
		};
		const errors = ['body.price Number must be greater than 0'];

		// Act
		const response = await request(app)
			.patch(`/api/products/${productId}`)
			.send(product);

		// Assert
		expect(response.status).toBe(422);
		expect(response.body).toHaveProperty('message');
		expect(response.body.status).toBe('fail');
		expect(response.body.errors).toEqual(errors);
	});
});

describe('DELETE /api/products/:id', () => {
	it('should delete a product', async () => {
		// Arrange
		const products = await request(app).get('/api/products');
		const productId = products.body[0].id;

		// Act
		const response = await request(app).delete(`/api/products/${productId}`);

		// Assert
		expect(response.status).toBe(204);
		expect(response.body).toMatchObject({});
	});

	it('should return a 422 error if the productId is invalid uuid', async () => {
		// Arrange
		const productId = 'invalid-uuid';

		// Act
		const response = await request(app).delete(`/api/products/${productId}`);

		// Assert
		expect(response.status).toBe(422);
	});
});
