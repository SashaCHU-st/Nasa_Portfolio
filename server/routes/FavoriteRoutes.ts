import { FastifyInstance } from 'fastify';
import { FavoriteSchema, DeleteFavSchema } from '../schema/FavoriteSchema';
import {
  addFavorite,
  myFavorite,
  deleteFavorite,
} from '../controllers/FavoriteControllers';
import { verifyJWT } from '../utils/verifyJWT';

export async function FavoriteRoutes(fastify: FastifyInstance) {
  fastify.post('/addFavorites', async (req, reply) => {
    if (!(await verifyJWT(req, reply))) return;
    const validated = FavoriteSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || 'Validation failed';
      reply.code(400).send({ message });
      return;
    }

    const data = {
      nasa_id: validated.data.nasa_id,
      title: validated.data.title,
      description: validated.data.description,
      image: validated.data.image ?? undefined,
    };

    return addFavorite(data, req, reply);
  });
  fastify.delete('/deleteFavorites', async (req, reply) => {
    if (!(await verifyJWT(req, reply))) return;
    const validated = DeleteFavSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || 'Validation failed';
      reply.code(400).send({ message });
      return;
    }

    const data = {
      nasa_id: validated.data.nasa_id,
    };

    return deleteFavorite(data, req, reply);
  });
  fastify.get('/myFavorites', async (req, reply) => {
    if (!(await verifyJWT(req, reply))) return;
    return myFavorite(req, reply);
  });
}
