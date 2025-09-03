import { FastifyReply, FastifyRequest } from "fastify";
import { authorisation } from "../utils/authorisation";
import { UserBody } from "../types/types";
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


export async function users(req: FastifyRequest, reply: FastifyReply) {
  try
  {
    const userId = await authorisation(req);
    
    const allUsers = await pool.query(`SELECT id, name, email FROM users WHERE id != $1`,[userId])
    
    console.log("USERS=>", allUsers.rows)

    return reply.code(200).send({ allUsers:allUsers.rows });
  }catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }


}

export async function user(req: FastifyRequest<{Body: UserBody}>, reply: FastifyReply) {
  
    const {id} =req.body

    try
    {
      const userProfile = await pool.query(`SELECT name, email FROM users WHERE id = $1`, [id])

      return reply.code(200).send({userProfile:userProfile.rows[0]})
    }catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}