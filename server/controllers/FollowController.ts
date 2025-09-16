import { FastifyReply, FastifyRequest } from 'fastify';
import { FollowBody } from '../types/types';
import { authorisation } from '../utils/authorisation';
import { pool } from '../db/db';

export async function subscribe(
  data: FollowBody,
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await authorisation(req, reply);
    const { follow_id } = data;

    const checkIfSubscribed = await pool.query(
      `SELECT * FROM follower WHERE user_id=$1 AND follow_id = $2 `,
      [userId, follow_id]
    );

    if (checkIfSubscribed.rowCount === 0) {
      await pool.query(
        `INSERT INTO follower (user_id, follow_id) VALUES ($1, $2)`,
        [userId, follow_id]
      );
      return reply.code(201).send({ message: 'Now I am following' });
    } else {
      return reply.code(200).send({ message: 'Subsribed aready' });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error:', err);
    }
    reply.code(500).send({ message: 'Something went wrong' });
  }
}

export async function unsubscribe(
  data: FollowBody,
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await authorisation(req, reply);
    const { follow_id } = data;
    await pool.query(
      `DELETE FROM follower WHERE user_id = $1 AND follow_id = $2`,
      [userId, follow_id]
    );
    return reply.code(200).send({ message: 'Deleted from subscrition' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error:', err);
    }
    reply.code(500).send({ message: 'Something went wrong' });
  }
}

export async function mySubscribtions(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await authorisation(req, reply);

    const mySubscrib = await pool.query(
      `
            SELECT f.follow_id  as id, u.name, u.image
            FROM follower as f
            INNER JOIN users u ON f.follow_id = u.id
            WHERE user_id = $1`,
      [userId]
    );

    return reply.code(200).send({ mySubscrib: mySubscrib.rows });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error:', err);
    }
    reply.code(500).send({ message: 'Something went wrong' });
  }
}

export async function myFollowers(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = await authorisation(req, reply);

    const mySubscrib = await pool.query(
      `
            SELECT f.follow_id  as id, u.name, u.image
            FROM follower as f
            INNER JOIN users u ON f.follow_id = u.id
            WHERE follow_id = $1`,
      [userId]
    );

    return reply.code(200).send({ mySubscrib: mySubscrib.rows });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error:', err);
    }
    reply.code(500).send({ message: 'Something went wrong' });
  }
}
