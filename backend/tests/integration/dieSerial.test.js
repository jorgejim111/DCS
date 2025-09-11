import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
const app = require('../../app');

const adminUser = {
  username: 'admin',
  password: 'Admin123!'
};

const newSerial = {
  serial_number: 'TEST-SERIAL-' + Date.now(),
  die_description_id: 1, // Usa un id válido existente
  status_id: 1, // Usa un id válido existente
  inner: 10.5,
  outer: 20.0,
  proudness: 1.2
};

describe('DieSerial: Creación de serial', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(adminUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('debe crear un nuevo serial', async () => {
    const res = await request(app)
      .post('/api/die-serial')
      .set('Authorization', `Bearer ${token}`)
      .send(newSerial);
    if (res.status < 200 || res.status >= 300) {
      console.error('Error response:', res.body);
    }
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    // Si la respuesta es solo el id, obtén el objeto completo y valida
    let serialObj = res.body;
    if (typeof serialObj === 'number') {
      // Si solo retorna el id, haz una petición GET para obtener el objeto
      const getRes = await request(app)
        .get(`/api/die-serial/${serialObj}`)
        .set('Authorization', `Bearer ${token}`);
      expect(getRes.status).toBe(200);
      serialObj = getRes.body;
    }
    expect(serialObj).toHaveProperty('id');
    expect(serialObj.serial_number).toBe(newSerial.serial_number);
  });
});
