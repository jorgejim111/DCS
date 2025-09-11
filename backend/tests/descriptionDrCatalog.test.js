import { describe, it, expect } from 'vitest';
import DescriptionDrCatalog from '../models/DescriptionDrCatalog';

describe('DescriptionDrCatalog Model', () => {
  it('should find all active description DRs', async () => {
    const result = await DescriptionDrCatalog.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new description DR', async () => {
    const newDR = { name: 'Test DR', is_active: true };
    const id = await DescriptionDrCatalog.create(newDR);
    expect(typeof id).toBe('number');
  });
});
