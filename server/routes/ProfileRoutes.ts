import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { me,  editProfile } from "../controllers/ProfileControllers";
import {  UserEditProfileSchema } from "../schema/UsersSchema";
import { verifyJWT } from "../utils/verifyJWT";


export async function ProfileRoutes(fastify: FastifyInstance) {

  fastify.get("/me", async (req, reply) => {
    if (!(await verifyJWT(req, reply))) return;
    return me(req, reply);
  });

fastify.post("/editProfile", async (req, reply) => {
  if (!(await verifyJWT(req, reply))) return;

  // console.log("BODY:", req.body);
  const validated = UserEditProfileSchema.safeParse(req.body);
  if (!validated.success) {
    const message = validated.error.issues[0]?.message || "Validation failed";
    reply.code(400).send({ message });
    return;
  }

  const data = {
    name: validated.data.name,
    password: validated.data.password,
    image: validated.data.image ?? undefined,
  };

  return editProfile(data, req, reply);
});
}