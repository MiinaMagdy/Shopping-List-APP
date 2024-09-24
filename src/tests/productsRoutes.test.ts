import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { Product } from '../models/Product';
import app from '../app';

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
