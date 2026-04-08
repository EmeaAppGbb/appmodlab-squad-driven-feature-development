import { FastifyRequest } from 'fastify';
import { UnauthorizedError } from './errors';

export async function authenticate(request: FastifyRequest): Promise<void> {
  try {
    await request.jwtVerify();
  } catch (err) {
    throw new UnauthorizedError('Invalid or missing token');
  }
}

export function getUserIdFromToken(request: FastifyRequest): number {
  const user = request.user as { userId: number };
  if (!user || !user.userId) {
    throw new UnauthorizedError('User ID not found in token');
  }
  return user.userId;
}
