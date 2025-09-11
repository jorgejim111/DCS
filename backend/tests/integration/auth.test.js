import { describe, it, expect } from 'vitest';
import request from 'supertest';
const app = require('../../app');

// Datos de usuario admin (de seed)
const adminUser = {
  username: 'admin',
  password: 'Admin123!'
};

describe('Auth: Login', () => {
  it('debe autenticar y devolver un token JWT para usuario válido', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(adminUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('debe rechazar credenciales inválidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'wrongpass' });
    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty('token');
  });
});
