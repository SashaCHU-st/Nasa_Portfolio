// tests/setup.ts
import { beforeAll, afterAll } from 'vitest';
import { build } from '../app';
import { pool } from '../db/db';

export let app: any;
export let testUser: any;

beforeAll(async () => {
  app = build();
  await app.ready();

  // удаляем старого testUser, если он остался
  await pool.query(`DELETE FROM users WHERE email = $1`, ['testing@example.com']);

  // создаём нового
  const response = await app.inject({
    method: 'POST',
    url: '/signup',
    payload: JSON.stringify({
      name: 'testing',
      email: 'testing@example.com',
      password: '123456',
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  testUser = response.json().user;
});

afterAll(async () => {
  await app.close();
});
