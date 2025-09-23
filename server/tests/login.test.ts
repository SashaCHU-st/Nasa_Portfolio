import {expect, it } from 'vitest';
import {app, testUser} from "./setup"
import { describe } from 'node:test';

interface Cookie {
  name: string;
  value: string;
  [key: string]: any;
}

describe('Login routes', () => {
  it('POST /login with invalid credentials should return 401', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: JSON.stringify({
        email: 'user@example.com',
        password: 'wrongpassword',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toHaveProperty('message');
  });
  it('POST /login not existing user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: JSON.stringify({
        email: 'userWrong@example.com',
        password: '123456',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toHaveProperty('message', 'No such user');
  });
  it('POST /login success', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: JSON.stringify({
        email: 'testing@example.com',
        password: '123456',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('message', 'Logged in');
    const tokenCookie = response.cookies.find(
      (c: Cookie) => c.name === 'auth_token'
    );
    expect(tokenCookie).toBeDefined();
  });
});
