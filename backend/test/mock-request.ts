import type { FastifyRequest } from 'fastify';

export const mockRequest = (
  userId: string,
  cookies: Record<string, string> = {},
) =>
  ({
    user: { sub: userId },
    cookies,
  }) as unknown as FastifyRequest;
