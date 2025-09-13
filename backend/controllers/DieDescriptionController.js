const DieDescription = require('../models/DieDescription');
const yup = require('yup');

const dieDescriptionSchema = yup.object().shape({
  die_description: yup.string().required('Die description is required'),
  inch_id: yup.number().required('Inch is required'),
  part_id: yup.number().required('Part is required'),
  description_id: yup.number().required('Description is required'),
  min_in_circulation: yup.number().default(0),
  min_in_stock: yup.number().default(0),
  is_active: yup.number().default(1),
});

module.exports = {
  async getAll(req, res) {
    try {
  // Mostrar todos los registros, activos e inactivos
  const descriptions = await DieDescription.findAll();
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die descriptions', details: error.message });
    }
  },
  async getActive(req, res) {
    try {
      const descriptions = await DieDescription.findActive();
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active die descriptions', details: error.message });
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
      const data = req.body;
      // Si solo se envía is_active, no validar con yup
      if (Object.keys(data).length === 1 && data.hasOwnProperty('is_active')) {
        const updated = await DieDescription.update(id, data);
        if (!updated) {
          return res.status(404).json({ error: 'Die description not found' });
        }
        return res.json({ message: 'Die description status updated' });
      }
      // Si se envían más campos, validar normalmente
      await dieDescriptionSchema.validate(data);
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
  async activate(req, res) {
    try {
      const { id } = req.params;
      const updated = await DieDescription.updateActive(id, true);
      if (!updated) {
        return res.status(404).json({ error: 'Die description not found' });
      }
      res.json({ message: 'Die description activated' });
    } catch (error) {
      res.status(500).json({ error: 'Error activating die description', details: error.message });
    }
  },
  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const updated = await DieDescription.updateActive(id, false);
      if (!updated) {
        return res.status(404).json({ error: 'Die description not found' });
      }
      res.json({ message: 'Die description deactivated' });
    } catch (error) {
      res.status(500).json({ error: 'Error deactivating die description', details: error.message });
    }
  },
};
