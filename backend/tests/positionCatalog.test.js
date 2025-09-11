import { describe, it, expect } from 'vitest';
import PositionCatalog from '../models/PositionCatalog';

describe('PositionCatalog Model', () => {
  it('should find all active positions', async () => {
    const result = await PositionCatalog.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new position', async () => {
    const newPosition = { name: 'Test Position', is_active: true };
    const id = await PositionCatalog.create(newPosition);
    expect(typeof id).toBe('number');
  });
});
