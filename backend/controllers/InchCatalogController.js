const InchCatalog = require('../models/InchCatalog');
const yup = require('yup');

const inchSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getAll(req, res) {
    try {
      const inches = await InchCatalog.findAll({ where: { is_active: true } });
      res.json(inches);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching inches', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const inch = await InchCatalog.findById(id);
      if (!inch || !inch.is_active) {
        return res.status(404).json({ error: 'Inch not found' });
      }
      res.json(inch);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching inch', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await inchSchema.validate(req.body);
      const { name } = req.body;
      const newInch = await InchCatalog.create({ name, is_active: true });
      res.status(201).json(newInch);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await inchSchema.validate(req.body);
      const { name } = req.body;
      const updated = await InchCatalog.update(id, { name });
      if (!updated) {
        return res.status(404).json({ error: 'Inch not found' });
      }
      res.json({ message: 'Inch updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await InchCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Inch not found' });
      }
      res.json({ message: 'Inch marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting inch', details: error.message });
    }
  },
};
