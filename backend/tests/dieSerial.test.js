import { describe, it, expect } from 'vitest';
import DieSerial from '../models/DieSerial';

describe('DieSerial Model', () => {
  it('should find all active serials', async () => {
    const result = await DieSerial.findAll({ where: { is_active: true } });
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new serial', async () => {
    // Usar serial_number único para evitar duplicados
    const uniqueSerial = 'TEST' + Date.now();
    const newSerial = {
      serial_number: uniqueSerial,
      die_description_id: 1,
      status_id: 1,
      inner: 0,
      outer: 0,
      proudness: 0
    };
    const id = await DieSerial.create(newSerial);
    expect(typeof id).toBe('number');
  });

  it('should update a serial', async () => {
    // Serial único
    const uniqueSerial = 'UPDATE' + Date.now();
    const newSerial = {
      serial_number: uniqueSerial,
      die_description_id: 1,
      status_id: 1,
      inner: 0,
      outer: 0,
      proudness: 0
    };
    const id = await DieSerial.create(newSerial);
    const updatedSerial = uniqueSerial + 'X';
    const updated = await DieSerial.update(id, { serial_number: updatedSerial, die_description_id: 1, status_id: 1, inner: 0, outer: 0, proudness: 0 });
    expect(updated).toBe(true);
  });

  it('should find serial by id', async () => {
    // Serial único
    const uniqueSerial = 'FIND' + Date.now();
    const newSerial = {
      serial_number: uniqueSerial,
      die_description_id: 1,
      status_id: 1,
      inner: 0,
      outer: 0,
      proudness: 0
    };
    const id = await DieSerial.create(newSerial);
    const serial = await DieSerial.findById(id);
    expect(serial).toHaveProperty('id');
  });
});
