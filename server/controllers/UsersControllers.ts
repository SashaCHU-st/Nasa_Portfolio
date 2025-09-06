import { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../db/db";
import { hashedPass } from "../utils/hashedPass";

export async function authorisation(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = (await req.jwtVerify()) as { id: number };
    return payload.id;
  } catch (err) {
    reply.code(401).send({ message: "Not authorized" });
    throw new Error("Unauthorized"); 
  }
}

export async function me(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = await authorisation(req, reply);
    if (!userId) return; 

    const userResult = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [userId]
    );
    return reply.send({ user: userResult.rows[0] });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function users(req: FastifyRequest, reply: FastifyReply) {
  try {
    const allUsers = await pool.query(`SELECT * FROM users`);
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

  // console.log("OOOOOOO")
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

export async function editProfile(
  data: { name?: string; password?: string; image?: string },
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await authorisation(req, reply);
    if (!userId) return;

    const { name, password, image } = data;
   if (!name && !password && !image) {
    return reply.code(400).send({
      message: "At least one field must be provided",
    });
  }

    if (name) {
      await pool.query(`UPDATE users SET name = $1 WHERE id = $2`, [name, userId]);
    }

    if (password) {
      await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [await hashedPass(password), userId]);
    }

    if (image) {
      await pool.query(`UPDATE users SET image = $1 WHERE id = $2`, [image, userId]);
    }

    const updatedUser = await pool.query(`SELECT name, image FROM users WHERE id = $1`, [userId]);

    return reply.code(200).send({
      message: "Profile updated",
      user: updatedUser.rows[0],
    });
  } catch (err: any) {
    console.error(err.message);
    reply.code(500).send({ message: "Something went wrong" });
  }
}
