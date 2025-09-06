import { FastifyRequest, FastifyReply } from "fastify";

export async function authorisation(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = (await req.jwtVerify()) as { id: number };
    return payload.id;
  } catch (err) {
    reply.code(401).send({ message: "Not authorized" });
    throw new Error("Unauthorized"); 
  }
}