const PartCatalog = require('../models/PartCatalog');
const yup = require('yup');

const partSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  // Obtener solo partes activas (para selects en frontend)
  async getActive(req, res) {
    try {
      const parts = await PartCatalog.findAll({ where: { is_active: true } });
      res.json(parts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active parts', details: error.message });
    }
  },
  async getAllRaw(req, res) {
    try {
      const parts = await PartCatalog.findAllRaw();
      res.json(parts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all parts', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const parts = await PartCatalog.findAll({ where: { is_active: true } });
      res.json(parts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching parts', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const part = await PartCatalog.findById(id);
      if (!part || !part.is_active) {
        return res.status(404).json({ error: 'Part not found' });
      }
      res.json(part);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching part', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await partSchema.validate(req.body);
      const { name } = req.body;
      const newPart = await PartCatalog.create({ name, is_active: true });
      res.status(201).json(newPart);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      if ('is_active' in req.body && Object.keys(req.body).length === 1) {
        const updated = await PartCatalog.update(id, { is_active: req.body.is_active });
        if (!updated) {
          return res.status(404).json({ error: 'Part not found' });
        }
        return res.json({ message: `Part ${req.body.is_active ? 'activated' : 'deactivated'}` });
      }
      if ('name' in req.body) {
        await partSchema.validate({ name: req.body.name });
        const updateData = { name: req.body.name };
        if ('is_active' in req.body) updateData.is_active = req.body.is_active;
        const updated = await PartCatalog.update(id, updateData);
        if (!updated) {
          return res.status(404).json({ error: 'Part not found' });
        }
        return res.json({ message: 'Part updated' });
      }
      return res.status(400).json({ error: 'No valid fields to update' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await PartCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Part not found' });
      }
      res.json({ message: 'Part marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting part', details: error.message });
    }
  },
};
