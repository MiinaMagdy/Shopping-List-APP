import { Request, Response, NextFunction } from 'express';
import {
	BadRequestException,
	HttpException,
	InternalServerException,
} from '../utils/HttpException';

export const errorHandler = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof HttpException) {
		return res.status(error.statusCode).json(error.serialize());
	}

	if (error instanceof SyntaxError) {
		const badRequest = new BadRequestException(error.message);
		return res.status(badRequest.statusCode).json(badRequest.serialize());
	}

	console.error(error);

	const internalError = new InternalServerException();

	return res.status(internalError.statusCode).json(internalError.serialize());
};
