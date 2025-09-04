import { FastifyInstance } from "fastify";
import { users, user} from "../controllers/UsersControllers";
import { UserSchema } from "../schema/UsersSchema";

export async function AllUsersRoutes(app: FastifyInstance) {
  app.get("/users", users);
    app.post("/user", async (req, reply) => {
      const validated = UserSchema.safeParse(req.body);
      if (!validated.success) {
        const message = validated.error.issues[0]?.message || "Validation failed";
        reply.code(400).send({ message });
        return;
      }
      return user({ ...req, body: validated.data }, reply);
    });
}
