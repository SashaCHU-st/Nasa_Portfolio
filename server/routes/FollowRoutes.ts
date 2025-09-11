import { FastifyInstance } from "fastify";
import { verifyJWT } from "../utils/verifyJWT";
import { SubscribeSchema } from "../schema/FollowSchema";
import { subscribe } from "../controllers/FollowController";

export async function FollowRoutes(fastify:FastifyInstance) {
fastify.post("/subscribe", async (req, reply) => {
    if (!(await verifyJWT(req, reply))) return;
    const validated = SubscribeSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }

    console.log("mmmm=>",validated.data.follow_id)
    const data = {
      follow_id: validated.data.follow_id,
    };

    return subscribe(data, req, reply);
  })
}