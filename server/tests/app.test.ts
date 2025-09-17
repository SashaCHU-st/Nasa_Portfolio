import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { build } from '../app';

let app:any;

beforeAll(async () => {
  app = build();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('Auth routes', () => {
  it('POST /login with invalid credentials should return 401', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toHaveProperty('message');
  });

  it('GET /users should return 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/users',
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json().allUsers)).toBe(true);
  });
});
