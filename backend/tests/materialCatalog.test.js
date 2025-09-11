import { describe, it, expect } from 'vitest';
import MaterialCatalog from '../models/MaterialCatalog';

describe('MaterialCatalog Model', () => {
  it('should find all active materials', async () => {
    const result = await MaterialCatalog.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new material', async () => {
    const newMaterial = { name: 'Test Material', is_active: true };
    const id = await MaterialCatalog.create(newMaterial);
    expect(typeof id).toBe('number');
  });
});
