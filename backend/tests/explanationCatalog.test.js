import { describe, it, expect } from 'vitest';
import ExplanationCatalog from '../models/ExplanationCatalog';

describe('ExplanationCatalog Model', () => {
  it('should find all active explanations', async () => {
    const result = await ExplanationCatalog.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new explanation', async () => {
    const newExplanation = { name: 'Test Explanation', is_active: true };
    const id = await ExplanationCatalog.create(newExplanation);
    expect(typeof id).toBe('number');
  });
});
