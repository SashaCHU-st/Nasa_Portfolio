import '../tests/setup';
import { describe, it, expect } from 'vitest';
import { app, testUser } from '../tests/setup';
import { pool } from '../db/db';

it('POST /user should return 200 and the user', async () => {

  await pool.query(`DELETE FROM users WHERE email = $1`, ['testing_user@example.com']);

  const newUser = testUser.json().user;

  const response = await app.inject({
    method: 'POST',
    url: '/user',
    payload: JSON.stringify({ id: newUser.id }),
    headers: { 'Content-Type': 'application/json' },
  });

  expect(response.statusCode).toBe(200);
  const userProfile = response.json().userProfile;
  expect(userProfile).toHaveProperty('name', newUser.name);
  expect(userProfile).toHaveProperty('email', newUser.email);
});
