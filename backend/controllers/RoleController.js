const Role = require('../models/Role');
const yup = require('yup');

const roleSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getActive(req, res) {
    try {
      // No hay is_active, así que devolvemos todos los roles
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active roles', details: error.message });
    }
  },
  async getAllRaw(req, res) {
    try {
      const roles = await Role.findAllRaw();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all roles', details: error.message });
    }
  },
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
      if ('is_active' in req.body && Object.keys(req.body).length === 1) {
        const updated = await Role.update(id, { is_active: req.body.is_active });
        if (!updated) {
          return res.status(404).json({ error: 'Role not found' });
        }
        return res.json({ message: `Role ${req.body.is_active ? 'activated' : 'deactivated'}` });
      }
      if ('name' in req.body) {
        await roleSchema.validate({ name: req.body.name });
        const updateData = { name: req.body.name };
        if ('is_active' in req.body) updateData.is_active = req.body.is_active;
        const updated = await Role.update(id, updateData);
        if (!updated) {
          return res.status(404).json({ error: 'Role not found' });
        }
        return res.json({ message: 'Role updated' });
      }
      return res.status(400).json({ error: 'No valid fields to update' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
};
