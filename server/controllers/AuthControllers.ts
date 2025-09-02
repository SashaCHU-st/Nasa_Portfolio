import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";
import { SignUpBody, LoginBody } from "../types/types";

export async function signUp(
  req: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply
) {
  const { name, email, password } = req.body;
  try {
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
    const user = newUser.rows[0];
    const token = reply.server.jwt.sign({ id: user.id });

    reply
      .setCookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 24 * 60 * 60,
      })
      .code(201)
      .send({ message: "All good", newUser: newUser.rows[0], token: token });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function login(
  req: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;
  try {
    const userExists = await pool.query(`SELECT FROM users WHERE email = $1`, [
      email,
    ]);

    if (userExists.rowCount !== 0) {
      const userLogin = await pool.query(
        `SELECT FROM users WHERE email = $1 AND password = $2`,
        [email, password]
      );
      if (userLogin.rowCount !== 0) {
        const user = userLogin.rows[0];
        const token = reply.server.jwt.sign({ id: user.id });

        reply
          .setCookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            path: "/",
            maxAge: 24 * 60 * 60,
          })
          .code(201)
          .send({
            message: "logged in",
          });
      } else {
        return reply.code(400).send({ message: "Wrong password" });
      }
    } else {
      return reply.code(400).send({ message: "No such user" });
    }
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
