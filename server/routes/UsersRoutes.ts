import { FastifyInstance } from "fastify";
import {me, users} from "../controllers/UserControllers"
export async function UsersRoutes(app: FastifyInstance) {

    console.log("WE in USERS")
    app.get("/me",me);
        app.get("/users",users);
}