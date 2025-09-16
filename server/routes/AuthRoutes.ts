import { FastifyInstance } from 'fastify';
import { SignUpSchema, LoginSchema } from '../schema/AuthSchema';
import { signUp, login, logout } from '../controllers/AuthControllers';

export async function AuthRoutes(app: FastifyInstance) {
  app.post('/signup', async (req, reply) => {
    const validated = SignUpSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || 'Validation failed';
      reply.code(400).send({ message });
      return;
    }
    return signUp({ ...req, body: validated.data }, reply);
  });
  app.post('/login', async (req, reply) => {
    const validated = LoginSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || 'Validation failed';
      reply.code(400).send({ message });
      return;
    }
    return login({ ...req, body: validated.data }, reply);
  });
  app.post('/logout', logout);
}
