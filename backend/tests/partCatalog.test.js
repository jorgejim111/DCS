import { describe, it, expect } from 'vitest';
import PartCatalog from '../models/PartCatalog';

describe('PartCatalog Model', () => {
  it('should find all active parts', async () => {
    const result = await PartCatalog.findAll({ where: { is_active: true } });
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new part', async () => {
    const newPart = { name: 'Test Part', is_active: true };
    const id = await PartCatalog.create(newPart);
    expect(typeof id).toBe('number');
  });

  it('should update a part', async () => {
    const updated = await PartCatalog.update(1, { name: 'Updated Part' });
    expect(updated).toBe(true);
  });

  it('should find part by id', async () => {
    const part = await PartCatalog.findById(1);
    expect(part).toHaveProperty('id');
  });
});
