import { describe, it, expect } from 'vitest';
import LineCatalog from '../models/LineCatalog';

describe('LineCatalog Model', () => {
  it('should find all active lines', async () => {
    const result = await LineCatalog.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new line', async () => {
    const newLine = { name: 'Test Line', is_active: true };
    const id = await LineCatalog.create(newLine);
    expect(typeof id).toBe('number');
  });
});
