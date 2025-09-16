import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      req: import('fastify').FastifyRequest,
      reply: import('fastify').FastifyReply
    ) => Promise<void>;
  }
}
