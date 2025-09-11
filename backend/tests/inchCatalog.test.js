import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import InchCatalog from '../models/InchCatalog';

// Mock de la conexión y datos si es necesario

describe('InchCatalog Model', () => {
  it('should find all active inches', async () => {
    const result = await InchCatalog.findAll({ where: { is_active: true } });
    expect(Array.isArray(result)).toBe(true);
    // Puedes agregar más validaciones según los datos esperados
  });

  it('should create a new inch', async () => {
    const newInch = { name: 'Test Inch', is_active: true };
    const id = await InchCatalog.create(newInch);
    expect(typeof id).toBe('number');
  });

  it('should update an inch', async () => {
    const updated = await InchCatalog.update(1, { name: 'Updated Inch' });
    expect(updated).toBe(true);
  });

  it('should find inch by id', async () => {
    const inch = await InchCatalog.findById(1);
    expect(inch).toHaveProperty('id');
  });
});
