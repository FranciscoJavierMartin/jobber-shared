import { StatusCodes } from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string, public comingFrom: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      comingFrom: this.comingFrom,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class BadRequestError extends CustomError {
  readonly statusCode: number = StatusCodes.BAD_REQUEST;
  readonly status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  readonly statusCode: number = StatusCodes.NOT_FOUND;
  readonly status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class UnauthorizedError extends CustomError {
  readonly statusCode: number = StatusCodes.UNAUTHORIZED;
  readonly status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  readonly statusCode: number = StatusCodes.REQUEST_TOO_LONG;
  readonly status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  readonly statusCode: number = StatusCodes.SERVICE_UNAVAILABLE;
  readonly status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
