import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { AuthRoutes } from "./routes/AuthRoutes";
import { UsersRoutes } from "./routes/UsersRoutes";
import "dotenv/config";

const fastify = Fastify({
  // logger: true
});

fastify.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});

fastify.register(fastifyCookie);

if (!process.env.JWT_KEY) {
  throw new Error("NO JWT_KEY");
}

fastify.register(fastifyJwt, {
  secret: process.env.JWT_KEY,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

// fastify.decorate("authenticate", async (request, reply) => {
//   try {
//     await request.jwtVerify();
//   } catch (err) {
//     reply.send(err);
//   }
// });

fastify.register(AuthRoutes);
fastify.register(async(instance)=>
{
  instance.register(UsersRoutes)
})

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
