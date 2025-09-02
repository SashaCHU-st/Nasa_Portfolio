import { FastifyInstance } from "fastify";
import {me} from "../controllers/UserControllers"
export async function UsersRoutes(app: FastifyInstance) {
    app.get("/me",me);
}