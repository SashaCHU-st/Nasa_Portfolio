import { FastifyReply, FastifyRequest } from "fastify";
import { FollowBody } from "../types/types";
import { authorisation } from "../utils/authorisation";
import { pool } from "../db/db";

export async function subscribe(data:FollowBody,req: FastifyRequest, reply:FastifyReply) {
    
    try{
        const userId = await authorisation(req, reply);
    const {follow_id} = data;
        console.log("KKKK=>",follow_id)

        const subscride = await pool.query(`INSERT INTO follower (user_id, follow_id) VALUES ($1, $2)`,[userId, follow_id])

        return reply.code(201).send({message:"Now I am following"})

    }catch(err:any)
    {
        console.error(err.message)
        reply.code(500).send({message:"Something went wrong"})
    }
}
