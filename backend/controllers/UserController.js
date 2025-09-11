const User = require('../models/User');
const yup = require('yup');

const userSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  // Agrega aquí otros campos requeridos según el modelo
});

module.exports = {
  async getAll(req, res) {
    try {
      const users = await User.findAll({ where: { is_active: true } });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user || !user.is_active) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await userSchema.validate(req.body);
      const data = req.body;
      const newUser = await User.create({ ...data, is_active: true });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await userSchema.validate(req.body);
      const data = req.body;
      const updated = await User.update(id, data);
      if (!updated) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await User.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
  },
};
