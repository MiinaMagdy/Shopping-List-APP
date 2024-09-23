import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { UnprocessableEntityException } from '../utils/HttpException';

// Create a middleware that validates the request body, query, params, and headers using the provided schema.
const validateResource =
	(schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			// Parse the request body, query, params, and headers using the schema then assign the parsed values to the request object.
			Object.assign(
				req,
				schema.parse({
					body: req.body,
					query: req.query,
					params: req.params,
					headers: req.headers,
				}),
			);
			next();
		} catch (error: any) {
			// If the error is an instance of ZodError, return a 422 Unprocessable Entity error with the error messages.
			if (error instanceof z.ZodError) {
				return next(
					new UnprocessableEntityException(
						'Invalid input.',
						error.errors.map(error => {
							const path = error.path.join('.');
							return `${path} ${error.message}`;
						}),
					),
				);
			}
			next(error);
		}
	};

export default validateResource;
