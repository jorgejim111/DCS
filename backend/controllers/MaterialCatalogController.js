const MaterialCatalog = require('../models/MaterialCatalog');
const yup = require('yup');

const materialSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getAll(req, res) {
    try {
      const materials = await MaterialCatalog.findAll({ where: { is_active: true } });
      res.json(materials);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching materials', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const material = await MaterialCatalog.findById(id);
      if (!material || !material.is_active) {
        return res.status(404).json({ error: 'Material not found' });
      }
      res.json(material);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching material', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await materialSchema.validate(req.body);
      const { name } = req.body;
      const newMaterial = await MaterialCatalog.create({ name, is_active: true });
      res.status(201).json(newMaterial);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await materialSchema.validate(req.body);
      const { name } = req.body;
      const updated = await MaterialCatalog.update(id, { name });
      if (!updated) {
        return res.status(404).json({ error: 'Material not found' });
      }
      res.json({ message: 'Material updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await MaterialCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Material not found' });
      }
      res.json({ message: 'Material marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting material', details: error.message });
    }
  },
};
