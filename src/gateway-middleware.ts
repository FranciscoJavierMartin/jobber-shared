import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from './error-handler';

const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

export function verifyGatewayRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token: string = req.headers?.gatewayToken as string;

  if (!token) {
    throw new UnauthorizedError(
      'Invalid request',
      'verifyGatewayRequest() method. Request is not coming from API Gateway'
    );
  }

  try {
    const payload: { id: string; iat: number } = JWT.verify(token, '') as {
      id: string;
      iat: number;
    };

    if (!tokens.includes(payload.id)) {
      throw new UnauthorizedError(
        'Invalid request',
        'verifyGatewayRequest() method. Request payload is invalid'
      );
    }
  } catch (error) {
    throw new UnauthorizedError(
      'Invalid request',
      'verifyGatewayRequest() method. Request is not coming from API Gateway'
    );
  }
}
