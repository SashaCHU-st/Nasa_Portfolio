import { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../db/db";


export async function users(req: FastifyRequest, reply: FastifyReply) {
  try {
    const allUsers = await pool.query(`SELECT id, name, email, image FROM users`);
    return reply.code(200).send({ allUsers: allUsers.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function user(
  req: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const { id } = req.body;
  try {
    const userProfile = await pool.query(
      `SELECT name, email, image FROM users WHERE id = $1`,
      [id]
    );
    return reply.code(200).send({ userProfile: userProfile.rows[0] });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function userFavorites(
  req: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {


  const { id } = req.body;
  try {
    const userFav = await pool.query(
      `SELECT nasa_id, title, description, image FROM favorites WHERE user_id = $1`,
      [id]
    );
    return reply.code(200).send({ userFav: userFav.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
