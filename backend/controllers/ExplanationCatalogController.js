const ExplanationCatalog = require('../models/ExplanationCatalog');
const yup = require('yup');

const explanationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getAll(req, res) {
    try {
      const explanations = await ExplanationCatalog.findAll({ where: { is_active: true } });
      res.json(explanations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching explanations', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const explanation = await ExplanationCatalog.findById(id);
      if (!explanation || !explanation.is_active) {
        return res.status(404).json({ error: 'Explanation not found' });
      }
      res.json(explanation);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching explanation', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await explanationSchema.validate(req.body);
      const { name } = req.body;
      const newExplanation = await ExplanationCatalog.create({ name, is_active: true });
      res.status(201).json(newExplanation);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await explanationSchema.validate(req.body);
      const { name } = req.body;
      const updated = await ExplanationCatalog.update(id, { name });
      if (!updated) {
        return res.status(404).json({ error: 'Explanation not found' });
      }
      res.json({ message: 'Explanation updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ExplanationCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Explanation not found' });
      }
      res.json({ message: 'Explanation marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting explanation', details: error.message });
    }
  },
};
