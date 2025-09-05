import { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../db/db";
import { authorisation } from "./UsersControllers";
import { FavoriteBody } from "../types/types";

export async function addFavorite(
  data: FavoriteBody,
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    console.log("KUKUUUUU");
    const userId = await authorisation(req, reply);
    const { nasa_id, title, description, image } = data;

    const alreadyFav = await pool.query(
      `SELECT nasa_id FROM favorites WHERE nasa_id = $1`,
      [nasa_id]
    );

    // console.log("UUUU=>", alreadyFav.rowCount);
    if (alreadyFav.rowCount === 0) {
      const addFav = await pool.query(
        `INSERT INTO favorites (nasa_id, title, description, image, user_id) VALUES ($1, $2, $3, $4, $5)`,
        [nasa_id, title, description, image, userId]
      );

      console.log("UUUU=>", addFav);
      return reply.code(201).send({ fav: addFav.rows });
    } else {
      return reply.code(201).send({ message: "Alredy in your favorites" });
    }
  } catch (err: any) {
    console.error(err.message);
    reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function myFavorite(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = await authorisation(req, reply);

    const myFav = await pool.query(
      `SELECT * FROM favorites WHERE user_id = $1`,
      [userId]
    );

    return reply.code(200).send({ fav: myFav.rows });
  } catch (err: any) {
    console.error(err.message);
    reply.code(500).send({ message: "Something went wrong" });
  }
}
