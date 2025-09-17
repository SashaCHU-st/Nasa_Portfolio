import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import 'dotenv/config';
import { AuthRoutes } from './routes/AuthRoutes';
import { ProfileRoutes } from './routes/ProfileRoutes';
import { AllUsersRoutes } from './routes/AllUsersRoutes';
import { FavoriteRoutes } from './routes/FavoriteRoutes';
import { FollowRoutes } from './routes/FollowRoutes';

export function build():FastifyInstance
{
    const fastify = Fastify({
      // logger: true,
      bodyLimit: 5 * 1024 * 1024,
    });
    
    if (!process.env.COOKIE_SECRET) {
      throw new Error('NO COOKIE_SECRET');
    }
    if (!process.env.JWT_KEY) {
      throw new Error('NO JWT_SECRET_KEY');
    }
    
    fastify.register(cookie, {
      secret: process.env.COOKIE_SECRET,
      parseOptions: {},
    });
    
    fastify.register(jwt, {
      secret: process.env.JWT_KEY,
      cookie: {
        cookieName: 'auth_token',
        signed: false,
      },
    });
    
    fastify.register(cors, {
      origin: ['https://nasa-portfolio.vercel.app', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
      credentials: true,
    });
    
    fastify.decorate(
      'authenticate',
      async (req: FastifyRequest, reply: FastifyReply) => {
        try {
          await req.jwtVerify();
        } catch {
          reply.code(401).send({ message: 'Invalid token' });
        }
      }
    );
    
    fastify.register(AuthRoutes);
    fastify.register(AllUsersRoutes);
    fastify.register(async (instance) => {
      async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
        try {
          await req.jwtVerify();
          return true;
        } catch {
          reply.code(401).send({ message: 'Invalid token' });
          return false;
        }
      }
    
      instance.register(ProfileRoutes, { preHandler: verifyJWT });
      instance.register(FavoriteRoutes, { preHandler: verifyJWT });
      instance.register(FollowRoutes, { preHandler: verifyJWT });
    });

    return fastify; 
}