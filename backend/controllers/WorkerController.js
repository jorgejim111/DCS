const Worker = require('../models/Worker');
const yup = require('yup');

const workerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  // Agrega aquí otros campos requeridos según el modelo
});

module.exports = {
  async getAll(req, res) {
    try {
      const workers = await Worker.findAll({ where: { is_active: true } });
      res.json(workers);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching workers', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const worker = await Worker.findById(id);
      if (!worker || !worker.is_active) {
        return res.status(404).json({ error: 'Worker not found' });
      }
      res.json(worker);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching worker', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await workerSchema.validate(req.body);
      const data = req.body;
      const newWorker = await Worker.create({ ...data, is_active: true });
      res.status(201).json(newWorker);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await workerSchema.validate(req.body);
      const data = req.body;
      const updated = await Worker.update(id, data);
      if (!updated) {
        return res.status(404).json({ error: 'Worker not found' });
      }
      res.json({ message: 'Worker updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Worker.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Worker not found' });
      }
      res.json({ message: 'Worker marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting worker', details: error.message });
    }
  },
};
