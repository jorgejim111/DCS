const DieDescription = require('../models/DieDescription');
const yup = require('yup');

const dieDescriptionSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  // Agrega aquí otros campos requeridos según el modelo
});

module.exports = {
  async getAll(req, res) {
    try {
      const descriptions = await DieDescription.findAll({ where: { is_active: true } });
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die descriptions', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const description = await DieDescription.findById(id);
      if (!description || !description.is_active) {
        return res.status(404).json({ error: 'Die description not found' });
      }
      res.json(description);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die description', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await dieDescriptionSchema.validate(req.body);
      const data = req.body;
      const newDescription = await DieDescription.create({ ...data, is_active: true });
      res.status(201).json(newDescription);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await dieDescriptionSchema.validate(req.body);
      const data = req.body;
      const updated = await DieDescription.update(id, data);
      if (!updated) {
        return res.status(404).json({ error: 'Die description not found' });
      }
      res.json({ message: 'Die description updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await DieDescription.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Die description not found' });
      }
      res.json({ message: 'Die description marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting die description', details: error.message });
    }
  },
};
