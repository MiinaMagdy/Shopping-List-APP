import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../app';

let products: any[] = [];

beforeEach(async () => {
	products.forEach(async product => {
		await request(app).delete(`/api/products/${product.id}`);
	});
	[1, 2, 3].forEach(async i => {
		const product = {
			name: `Product ${i}`,
			price: 10 * i,
			stock: 10 * i,
		};
		await request(app).post('/api/products').send(product);
	});
	const response = await request(app).get('/api/products');
	products = response.body;
});

// POST /api/shopping-list/:productId (add a product to the shopping list)
describe('POST /api/shopping-list/:productId', () => {
	it('should add a product to the shopping list', async () => {
		// Arrange
		const reqBody = {
			productId: products[0].id,
			quantity: 1,
		};

		// Act
		const response = await request(app)
			.post('/api/shopping-list')
			.send(reqBody);

		// Assert
		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({
			message: 'Product added to shopping list',
		});
	});

	it('should return a 422 error if the product is invalid', async () => {
		// Arrange
		const reqBody = {
			productId: 'invalid-uuid',
			quantity: 1,
		};

		// Act
		const response = await request(app)
			.post('/api/shopping-list')
			.send(reqBody);

		// Assert
		expect(response.status).toBe(422);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: 'Invalid input.',
			errors: ['body.productId Invalid uuid'],
		});
	});

	it('should return a 404 error if the product does not exist', async () => {
		// Arrange
		const reqBody = {
			productId: '00000000-0000-0000-0000-000000000000',
			quantity: 1,
		};

		// Act
		const response = await request(app)
			.post('/api/shopping-list')
			.send(reqBody);

		// Assert
		expect(response.status).toBe(404);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: 'Product with id 00000000-0000-0000-0000-000000000000 not found',
			errors: [],
		});
	});

	it('should return a 422 error if the quantity is negative', async () => {
		// Arrange
		const reqBody = {
			productId: products[0].id,
			quantity: -1,
		};

		// Act
		const response = await request(app)
			.post('/api/shopping-list')
			.send(reqBody);

		// Assert
		expect(response.status).toBe(422);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: 'Invalid input.',
			errors: ['body.quantity Number must be greater than 0'],
		});
	});

	it('should return a 400 error if the product is out of stock', async () => {
		// Arrange
		const reqBody = {
			productId: products[0].id,
			quantity: 100,
		};

		// Act
		const response = await request(app)
			.post('/api/shopping-list')
			.send(reqBody);

		console.log(response.body);
		// Assert
		expect(response.status).toBe(400);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: 'Not enough stock',
			errors: [],
		});
	});
});

// GET /api/shopping-list (retrieve the shopping list)
describe('GET /api/shopping-list', () => {
	it('should return the shopping list', async () => {
		// Act
		const response = await request(app).get('/api/shopping-list');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('shoppingList');
		expect(response.body).toHaveProperty('totalPrice');
		expect(response.body.shoppingList).toHaveLength(0);
	});

	it('should return the shopping list with a product', async () => {
		// Arrange
		const reqBody = {
			productId: products[0].id,
			quantity: 1,
		};
		await request(app).post('/api/shopping-list').send(reqBody);

		// Act
		const response = await request(app).get('/api/shopping-list');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.shoppingList).toHaveLength(1);
		expect(response.body.totalPrice).toBe(products[0].price);
	});

	it('should return the shopping list with a product and a quantity of 2', async () => {
		// Arrange
		const reqBody = {
			productId: products[0].id,
			quantity: 2,
		};
		await request(app).post('/api/shopping-list').send(reqBody);

		// Act
		const response = await request(app).get('/api/shopping-list');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.shoppingList).toHaveLength(1);
		expect(response.body.totalPrice).toBe(products[0].price * 2);
	});

	it('should return the shopping list with 2 products', async () => {
		// Arrange
		const reqBody1 = {
			productId: products[0].id,
			quantity: 1,
		};
		const reqBody2 = {
			productId: products[1].id,
			quantity: 2,
		};
		await request(app).post('/api/shopping-list').send(reqBody1);
		await request(app).post('/api/shopping-list').send(reqBody2);

		// Act
		const response = await request(app).get('/api/shopping-list');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.shoppingList).toHaveLength(2);
		expect(response.body.totalPrice).toBe(
			products[0].price + products[1].price * 2,
		);
	});
});

// DELETE /api/shopping-list/:productId (remove a product from the shopping list)
describe('DELETE /api/shopping-list/:productId', () => {
	it('should remove a product from the shopping list', async () => {
		// Arrange
		const reqBody = {
			productId: products[0].id,
			quantity: 1,
		};
		await request(app).post('/api/shopping-list').send(reqBody);

		// Act
		const response = await request(app).delete(
			`/api/shopping-list/${products[0].id}`,
		);

		// Assert
		expect(response.status).toBe(204);
		expect(response.body).toMatchObject({});
	});

	it('should return a 404 error if the product is not in the shopping list', async () => {
		// Act
		const response = await request(app).delete(
			`/api/shopping-list/${products[0].id}`,
		);

		// Assert
		expect(response.status).toBe(404);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: `Product with id ${products[0].id} not found`,
			errors: [],
		});
	});
});

// POST api/shopping-list/promocodes (apply a promo code)
describe('POST api/shopping-list/promocodes', () => {
	it('should apply a promo code', async () => {
		// Arrange
		const promoCodeReq = {
			name: 'PROMO_CODE',
			percentage: 0.1,
		};
		await request(app).post('/api/promocodes').send(promoCodeReq);
		const promoCode = promoCodeReq.name;

		// Act
		const response = await request(app).post(
			'/api/shopping-list/promocodes/' + promoCode,
		);

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({ message: 'Promo code applied' });
	});

	it('should return a 422 error if the promo code is invalid', async () => {
		// Arrange
		const promoCode = 'invalid-promo-code';

		// Act
		const response = await request(app).post(
			'/api/shopping-list/promocodes/' + promoCode,
		);

		// Assert
		expect(response.status).toBe(422);
		expect(response.body).toMatchObject({
			status: 'fail',
			message: 'Invalid input.',
			errors: ['params.name Invalid'],
		});
	});
});

// DELETE api/shopping-list/promocodes (remove applied promo code)
describe('DELETE api/shopping-list/promocodes', () => {
	it('should remove applied promo code', async () => {
		// Arrange
		const promoCodeReq = {
			name: 'PROMO_CODE',
			percentage: 0.1,
		};
		await request(app).post('/api/promocodes').send(promoCodeReq);
		const promoCode = promoCodeReq.name;
		await request(app).post('/api/shopping-list/promocodes/' + promoCode);

		// Act
		const response = await request(app).delete('/api/shopping-list/promocodes');

		// Assert
		expect(response.status).toBe(204);
		expect(response.body).toMatchObject({});
	});
});
