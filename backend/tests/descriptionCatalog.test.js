import { describe, it, expect } from 'vitest';
import DescriptionCatalog from '../models/DescriptionCatalog';

describe('DescriptionCatalog Model', () => {
  it('should find all active descriptions', async () => {
    const result = await DescriptionCatalog.findAll({ where: { is_active: true } });
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new description', async () => {
    const newDescription = { name: 'Test Description', is_active: true };
    const id = await DescriptionCatalog.create(newDescription);
    expect(typeof id).toBe('number');
  });

  it('should update a description', async () => {
    const updated = await DescriptionCatalog.update(1, { name: 'Updated Description' });
    expect(updated).toBe(true);
  });

  it('should find description by id', async () => {
    const description = await DescriptionCatalog.findById(1);
    expect(description).toHaveProperty('id');
  });
});
