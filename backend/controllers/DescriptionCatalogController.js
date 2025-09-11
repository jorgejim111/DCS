const DescriptionCatalog = require('../models/DescriptionCatalog');
const yup = require('yup');

const descriptionSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getAll(req, res) {
    try {
      const descriptions = await DescriptionCatalog.findAll({ where: { is_active: true } });
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching descriptions', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const description = await DescriptionCatalog.findById(id);
      if (!description || !description.is_active) {
        return res.status(404).json({ error: 'Description not found' });
      }
      res.json(description);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching description', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await descriptionSchema.validate(req.body);
      const { name } = req.body;
      const newDescription = await DescriptionCatalog.create({ name, is_active: true });
      res.status(201).json(newDescription);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await descriptionSchema.validate(req.body);
      const { name } = req.body;
      const updated = await DescriptionCatalog.update(id, { name });
      if (!updated) {
        return res.status(404).json({ error: 'Description not found' });
      }
      res.json({ message: 'Description updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await DescriptionCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Description not found' });
      }
      res.json({ message: 'Description marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting description', details: error.message });
    }
  },
};
