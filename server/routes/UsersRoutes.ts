import { FastifyInstance } from "fastify";
import {me, users, user} from "../controllers/UserControllers"
import { UserSchema } from "../schema/UsersSchema";



export async function UsersRoutes(app: FastifyInstance) {

    console.log("WE in USERS")
    app.get("/me",me);
    app.get("/users",users);
    app.post("/user",async (req, reply) => {
        const validated = UserSchema.safeParse(req.body);
        if (!validated.success) {
          const message = validated.error.issues[0]?.message || "Validation failed";
          reply.code(400).send({ message });
          return;
        }
        return user({ ...req, body: validated.data }, reply);
      });
}