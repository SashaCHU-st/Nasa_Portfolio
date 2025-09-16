import { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../db/db";
import { authorisation } from "./../utils/authorisation";
import { FavoriteBody, DeleteFavBody } from "../types/types";

export async function addFavorite(
  data: FavoriteBody,
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {

    const userId = await authorisation(req, reply);
    const { nasa_id, title, description, image } = data;
    
    const alreadyFav = await pool.query(
      `SELECT nasa_id FROM favorites WHERE nasa_id = $1 AND user_id = $2`,
      [nasa_id, userId]
    );

    if (alreadyFav.rowCount === 0) {
      const addFav = await pool.query(
        `INSERT INTO favorites (nasa_id, title, description, image, user_id) VALUES ($1, $2, $3, $4, $5)`,
        [nasa_id, title, description, image, userId]
      );

      return reply.code(201).send({ message: "Added to favorites", fav: addFav.rows });
    } else {
      return reply.code(400).send({ message: "Alredy in your favorites" });
    }
  } catch (err: any) {
    console.error(err.message);
    reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function deleteFavorite(
  data: DeleteFavBody,
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await authorisation(req, reply);
    const { nasa_id } = data;

    const deleteFav = await pool.query(
      `DELETE FROM favorites WHERE nasa_id = $1 AND user_id = $2 `,
      [nasa_id, userId]
    );
    return reply.code(200).send({ fav: deleteFav.rows });
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
