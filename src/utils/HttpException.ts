import { HttpStatus, ResponseStatus } from './enums';

interface SerializedError {
	status: string;
	message: string;
	errors: string[];
}

export abstract class HttpException extends Error {
	abstract statusCode: HttpStatus;

	constructor(
		message: string = 'Something went wrong',
		public errors: string[] = [],
	) {
		super(message);
		this.errors = errors;
	}

	serialize(): SerializedError {
		return {
			status: ResponseStatus.FAIL,
			message: this.message,
			errors: this.errors,
		};
	}
}

export class BadRequestException extends HttpException {
	statusCode = HttpStatus.BAD_REQUEST;
}

export class UnauthorizedException extends HttpException {
	statusCode = HttpStatus.UNAUTHORIZED;
}

export class ForbiddenException extends HttpException {
	statusCode = HttpStatus.FORBIDDEN;
}

export class NotFoundException extends HttpException {
	statusCode = HttpStatus.NOT_FOUND;
}

export class ConflictException extends HttpException {
	statusCode = HttpStatus.CONFLICT;
}

export class InternalServerException extends HttpException {
	statusCode = HttpStatus.INTERNAL_SERVER;
}

export class PayloadTooLargeException extends HttpException {
	statusCode = HttpStatus.PAYLOAD_TOO_LARGE;
}

export class UnsupportedMediaTypeException extends HttpException {
	statusCode = HttpStatus.UNSUPPORTED_MEDIA_TYPE;
}

export class UnprocessableEntityException extends HttpException {
	statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
}
