import { Request, Response, NextFunction } from 'express';
import { HttpException, InternalServerException } from '../utils/HttpException';

export const errorHandler = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof HttpException) {
		return res.status(error.statusCode).json(error.serialize());
	}

	console.error(error);

	const internalError = new InternalServerException();

	return res.status(internalError.statusCode).json(internalError.serialize());
};
