import { describe, it, expect } from 'vitest';
import User from '../models/User';

describe('User Model', () => {
  it('should find all users', async () => {
    const result = await User.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new user', async () => {
    const newUser = { username: 'testuser', password: 'testpass', role_id: 1 };
    const id = await User.create(newUser);
    expect(typeof id).toBe('number');
  });
});
