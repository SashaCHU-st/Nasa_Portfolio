import { describe, it, expect } from 'vitest';
import { app, testUser } from './setup';

describe('SignUp routes', () => {
  it('POST /signup with already exist email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: JSON.stringify({
        name: 'user',
        email: testUser.email, 
        password: '123456',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      'message',
      'User already exists with this email'
    );
  });
  it('POST /signup name required', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: JSON.stringify({
        name: '',
        email: 'namerequired@example.com',
        password: '123456',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty('message', 'Name is required');
  });
  it('POST /signup name cannot be spaces', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: JSON.stringify({
        name: ' ',
        email: 'namerequired@example.com',
        password: '123456',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      'message',
      'Name cannot be only spaces'
    );
  });
  it('POST /signup name max 15 characters', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: JSON.stringify({
        name: '123456789012345',
        email: 'nametoolong@example.com',
        password: '123456',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      'message',
      'Name maximum 15 characters'
    );
  });
  it('POST /signup password max 40 characters', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: JSON.stringify({
        name: 'kuku',
        email: 'passtoolong@example.com',
        password: '12345678901234567890123456789012345678901',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      'message',
      'Too big: expected string to have <=40 characters'
    );
  });
  it('POST /signup password min 4 characters', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: JSON.stringify({
        name: 'kuku',
        email: 'passshortong@example.com',
        password: '123',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      'message',
      'Password minimum 4 characters'
    );
  });
  it('POST /signup email too long, max 20 characters', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: JSON.stringify({
        name: 'kuku',
        email: '12345678901234567890@example.com',
        password: '12345',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      'message',
      'email cannot be more then 20 characters'
    );
  });
});
