import { FastifyRequest, FastifyReply } from 'fastify';

interface JwtRequest extends FastifyRequest {
  jwtVerify(): Promise<void>;
}

export async function verifyJWT(req: JwtRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
    return true;
  } catch {
    reply
      .code(401)
      .header('Access-Control-Allow-Origin', req.headers.origin || '*')
      .header('Access-Control-Allow-Credentials', 'true')
      .send({ message: 'Invalid token' });
    return false;
  }
}
