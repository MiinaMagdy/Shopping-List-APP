import { beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../app';

// GET /api/promocodes (get all promo codes)
describe('GET /api/promocodes', () => {
	it('should return an empty array if there are no promo codes', async () => {
		// Act
		const response = await request(app).get('/api/promocodes');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject([]);
	});

	it('should return an array with all promo codes', async () => {
		// Arrange
		const promoCodes = [
			{
				name: 'PROMO1',
				percentage: 0.1,
			},
			{
				name: 'PROMO2',
				percentage: 0.1,
			},
		];
		await request(app).post('/api/promocodes').send(promoCodes[0]);
		await request(app).post('/api/promocodes').send(promoCodes[1]);

		// Act
		const response = await request(app).get('/api/promocodes');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject(promoCodes);
	});
});

// POST /api/promocodes (add a promo code)
describe('POST /api/promocodes', () => {
	it('should add a promo code', async () => {
		// Arrange
		const promoCode = {
			name: 'PROMO3',
			percentage: 0.3,
		};

		// Act
		const response = await request(app).post('/api/promocodes').send(promoCode);

		// Assert
		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({ message: 'Promo code created' });
	});

	it('should return a 422 error if the promo code is invalid', async () => {
		// Arrange
		const promoCode = {
			name: 'PROMO4',
			percentage: -30,
		};
		const errors = [
			'body.percentage Number must be greater than or equal to 0',
		];

		// Act
		const response = await request(app).post('/api/promocodes').send(promoCode);

		// Assert
		expect(response.status).toBe(422);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: 'Invalid input.',
			errors,
		});
	});
});

// GET /api/promocodes/:name (get a promo code by name)
describe('GET /api/promocodes/:name', () => {
	it('should return a promo code', async () => {
		// Arrange
		const promoCode = {
			name: 'PROMO1',
			percentage: 0.1,
		};

		// Act
		const response = await request(app).get(
			`/api/promocodes/${promoCode.name}`,
		);

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject(promoCode);
	});

	it('should return a 404 error if the promo code is not found', async () => {
		// Arrange
		const promoCodeName = 'INVALID_PROMO_CODE';

		// Act
		const response = await request(app).get(`/api/promocodes/${promoCodeName}`);

		// Assert
		expect(response.status).toBe(404);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: `Promo code with name ${promoCodeName} not found`,
			errors: [],
		});
	});
});

// DELETE /api/promocodes/:name (delete a promo code by name)
describe('DELETE /api/promocodes/:name', () => {
	it('should delete a promo code', async () => {
		// Arrange
		const promoCodeName = 'PROMO1';

		// Act
		const response = await request(app).delete(
			`/api/promocodes/${promoCodeName}`,
		);

		// Assert
		expect(response.status).toBe(204);
		expect(response.body).toMatchObject({});
	});

	it('should return a 404 error if the promo code is not found', async () => {
		// Arrange
		const promoCodeName = 'INVALID_PROMO_CODE';

		// Act
		const response = await request(app).delete(
			`/api/promocodes/${promoCodeName}`,
		);

		// Assert
		expect(response.status).toBe(404);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: `Promo code with name ${promoCodeName} not found`,
			errors: [],
		});
	});
});
