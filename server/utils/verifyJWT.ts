import { FastifyRequest, FastifyReply } from "fastify";

interface JwtRequest extends FastifyRequest {
  jwtVerify(): Promise<void>;
}

export async function verifyJWT(req: JwtRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
    return true;
  } catch {
    reply.code(401).send({ message: "Invalid token" });
    return false;
  }
}
