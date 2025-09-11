import { describe, it, expect } from 'vitest';
import StatusCatalog from '../models/StatusCatalog';

describe('StatusCatalog Model', () => {
  it('should find all active statuses', async () => {
    const result = await StatusCatalog.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new status', async () => {
    const newStatus = { name: 'Test Status', is_active: true };
    const id = await StatusCatalog.create(newStatus);
    expect(typeof id).toBe('number');
  });
});
