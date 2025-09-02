import { FastifyReply, FastifyRequest } from "fastify";
import { authorisation } from "../utils/authorisation";
import { pool } from "../db/db";

export async function me(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = await authorisation(req);

    console.log("YYY=>",userId)
    const myProfile = await pool.query(`SELECT FROM users WHERE id = $1`, [
      userId,
    ]);
    console.log("ME=>", myProfile.rows)
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
