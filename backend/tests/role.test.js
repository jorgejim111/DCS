import { describe, it, expect } from 'vitest';
import Role from '../models/Role';

describe('Role Model', () => {
  it('should find all roles', async () => {
    const result = await Role.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new role', async () => {
    const newRole = { name: 'Test Role' };
    const id = await Role.create(newRole);
    expect(typeof id).toBe('number');
  });
});
