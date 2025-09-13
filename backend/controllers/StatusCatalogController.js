const StatusCatalog = require('../models/StatusCatalog');
const yup = require('yup');

const statusSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getActive(req, res) {
    try {
      const statuses = await StatusCatalog.findAll();
      const activeStatuses = Array.isArray(statuses) ? statuses.filter(s => s.is_active) : [];
      res.json(activeStatuses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active statuses', details: error.message });
    }
  },
  async getAllRaw(req, res) {
    try {
      const statuses = await StatusCatalog.findAllRaw();
      res.json(statuses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all statuses', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const statuses = await StatusCatalog.findAll({ where: { is_active: true } });
      res.json(statuses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching statuses', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const status = await StatusCatalog.findById(id);
      if (!status || !status.is_active) {
        return res.status(404).json({ error: 'Status not found' });
      }
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching status', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await statusSchema.validate(req.body);
      const { name } = req.body;
      const newStatus = await StatusCatalog.create({ name, is_active: true });
      res.status(201).json(newStatus);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      if ('is_active' in req.body && Object.keys(req.body).length === 1) {
        const updated = await StatusCatalog.update(id, { is_active: req.body.is_active });
        if (!updated) {
          return res.status(404).json({ error: 'Status not found' });
        }
        return res.json({ message: `Status ${req.body.is_active ? 'activated' : 'deactivated'}` });
      }
      if ('name' in req.body) {
        await statusSchema.validate({ name: req.body.name });
        const updateData = { name: req.body.name };
        if ('is_active' in req.body) updateData.is_active = req.body.is_active;
        const updated = await StatusCatalog.update(id, updateData);
        if (!updated) {
          return res.status(404).json({ error: 'Status not found' });
        }
        return res.json({ message: 'Status updated' });
      }
      return res.status(400).json({ error: 'No valid fields to update' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await StatusCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Status not found' });
      }
      res.json({ message: 'Status marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting status', details: error.message });
    }
  },
};
