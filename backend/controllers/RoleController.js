const Role = require('../models/Role');
const yup = require('yup');

const roleSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getAll(req, res) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching roles', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching role', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await roleSchema.validate(req.body);
      const { name } = req.body;
      const newRole = await Role.create({ name });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await roleSchema.validate(req.body);
      const { name } = req.body;
      const updated = await Role.update(id, { name });
      if (!updated) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.json({ message: 'Role updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
};
