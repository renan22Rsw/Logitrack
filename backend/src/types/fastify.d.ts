declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      username: string;
      sub: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
