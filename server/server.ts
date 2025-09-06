import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import "dotenv/config";
import { pool } from "./db/db";

import { AuthRoutes } from "./routes/AuthRoutes";
import { ProfileRoutes } from "./routes/ProfileRoutes";
import { AllUsersRoutes } from "./routes/AllUsersRoutes";
import { FavoriteRoutes } from "./routes/FavoriteRoutes";

const fastify = Fastify({
  // logger: true,
  bodyLimit: 5 * 1024 * 1024,
});

if (!process.env.COOKIE_SECRET) {
  throw new Error("NO COOKIE_SECRET");
}
if (!process.env.JWT_KEY) {
  throw new Error("NO JWT_SECRET_KEY");
}

fastify.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {},
});

fastify.register(jwt, {
  secret: process.env.JWT_KEY,
  cookie: {
    cookieName: "auth_token",
    signed: false,
    
  },
});

fastify.register(cors, {
  origin: ["https://nasa-portfolio.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  credentials: true,
});

fastify.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch {
      reply.code(401).send({ message: "Invalid token" });
    }
  }
);

fastify.register(AuthRoutes);
fastify.register(AllUsersRoutes);
fastify.register(async (instance) => {
  async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
    try {
      await req.jwtVerify();
      return true;
    } catch {
      reply.code(401).send({ message: "Invalid token" });
      return false;
    }
  }

  instance.register(ProfileRoutes, { preHandler: verifyJWT });
  instance.register(FavoriteRoutes, { preHandler: verifyJWT });
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    // console.log("🚀 Server running on port", port);
  } catch (err) {
    console.error("❌ Server start error:", err);
    process.exit(1);
  }
};

start();
