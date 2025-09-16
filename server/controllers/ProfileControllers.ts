import { FastifyRequest, FastifyReply } from 'fastify';
import { pool } from '../db/db';
import { authorisation } from '../utils/authorisation';
import { hashedPass } from '../utils/hashedPass';

export async function me(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = await authorisation(req, reply);
    if (!userId) return;

    const userResult = await pool.query(
      `SELECT image, name, password FROM users WHERE id = $1`,
      [userId]
    );
    return reply.code(200).send({ user: userResult.rows[0] });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error:', err);
    }
    reply.code(500).send({ message: 'Something went wrong' });
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
        message: 'At least one field must be provided',
      });
    }

    if (name) {
      await pool.query(`UPDATE users SET name = $1 WHERE id = $2`, [
        name,
        userId,
      ]);
    }

    if (password) {
      await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [
        await hashedPass(password),
        userId,
      ]);
    }

    if (image) {
      await pool.query(`UPDATE users SET image = $1 WHERE id = $2`, [
        image,
        userId,
      ]);
    }

    const updatedUser = await pool.query(
      `SELECT name, image FROM users WHERE id = $1`,
      [userId]
    );

    return reply.code(200).send({
      message: 'Profile updated',
      user: updatedUser.rows[0],
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error:', err);
    }
    reply.code(500).send({ message: 'Something went wrong' });
  }
}
