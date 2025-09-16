import { FastifyReply, FastifyRequest } from 'fastify';
import { pool } from '../db/db';
import { SignUpBody, LoginBody } from '../types/types';
import { hashedPass } from '../utils/hashedPass';
import bcrypt from 'bcrypt';

export async function signUp(
  req: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply
) {
  const { name, email, password } = req.body;
  try {
    const checkUser = await pool.query(
      `SELECT email FROM users WHERE email = $1`,
      [email]
    );

    if (checkUser.rowCount === 0) {
      const newUser = await pool.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
        [name, email, await hashedPass(password)]
      );
      const user = newUser.rows[0];
      const token = reply.server.jwt.sign({ id: user.id });

      reply
        .setCookie('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          path: '/',
          maxAge: 24 * 60 * 60,
        })
        .code(200)
        .send({ message: 'Logged in', user });
    } else {
      reply.code(400).send({ message: 'User already exists with this email' });
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

export async function login(
  req: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;
  try {
    const userExists = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userExists.rowCount !== 0) {
      const userLogin = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );
      if (userLogin.rowCount !== 0) {
        const checkPass = await bcrypt.compare(
          password,
          userLogin.rows[0].password
        );
        if (!checkPass) {
          return reply
            .code(400)
            .send({ message: 'Wrong password', pass: 'Wrong password' });
        }
        const user = userLogin.rows[0];
        if (!user)
          return reply.code(401).send({ message: 'Invalid credentials' });

        const token = reply.server.jwt.sign({ id: user.id });
        reply
          .setCookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: 24 * 60 * 60,
          })
          .code(200)
          .send({ message: 'Logged in', user });
      } else {
        return reply.code(400).send({ message: 'Wrong password' });
      }
    } else {
      return reply
        .code(400)
        .send({ message: 'No such user', email: 'No such user' });
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

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  reply
    .clearCookie('auth_token', {
      path: '/',
      httpOnly: true,
      secure: false,
    })
    .code(200)
    .send({ message: 'Logged out' });
}
