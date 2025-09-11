import { describe, it, expect } from 'vitest';
import DieDescription from '../models/DieDescription';

describe('DieDescription Model', () => {
  it('should find all active die descriptions', async () => {
    const result = await DieDescription.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new die description', async () => {
    const newDesc = {
      inch_id: 1,
      part_id: 1,
      description_id: 1,
      die_description: 'Test Die',
      min_in_circulation: 1,
      min_in_stock: 1
    };
    const id = await DieDescription.create(newDesc);
    expect(typeof id).toBe('number');
  });
});
