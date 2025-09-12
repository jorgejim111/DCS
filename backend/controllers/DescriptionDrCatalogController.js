const DescriptionDrCatalog = require('../models/DescriptionDrCatalog');
const yup = require('yup');

const descriptionDrSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  async getAllRaw(req, res) {
    try {
      const descriptions = await DescriptionDrCatalog.findAllRaw();
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all DR descriptions', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const descriptions = await DescriptionDrCatalog.findAll({ where: { is_active: true } });
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching DR descriptions', details: error.message });
    }
  },
  async getAllRaw(req, res) {
    try {
      const descriptions = await DescriptionDrCatalog.findAllRaw();
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all DR descriptions', details: error.message });
    }
  },
  async getAllRaw(req, res) {
    try {
      const descriptions = await DescriptionDrCatalog.findAllRaw();
      res.json(descriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all DR descriptions', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const description = await DescriptionDrCatalog.findById(id);
      if (!description || !description.is_active) {
        return res.status(404).json({ error: 'DR Description not found' });
      }
      res.json(description);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching DR description', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await descriptionDrSchema.validate(req.body);
      const { name } = req.body;
      const newDescription = await DescriptionDrCatalog.create({ name, is_active: true });
      res.status(201).json(newDescription);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      if ('is_active' in req.body && Object.keys(req.body).length === 1) {
        const updated = await DescriptionDrCatalog.update(id, { is_active: req.body.is_active });
        if (!updated) {
          return res.status(404).json({ error: 'DR Description not found' });
        }
        return res.json({ message: `DR Description ${req.body.is_active ? 'activated' : 'deactivated'}` });
      }
      if ('name' in req.body) {
        await descriptionDrSchema.validate({ name: req.body.name });
        const updateData = { name: req.body.name };
        if ('is_active' in req.body) updateData.is_active = req.body.is_active;
        const updated = await DescriptionDrCatalog.update(id, updateData);
        if (!updated) {
          return res.status(404).json({ error: 'DR Description not found' });
        }
        return res.json({ message: 'DR Description updated' });
      }
      return res.status(400).json({ error: 'No valid fields to update' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await DescriptionDrCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'DR Description not found' });
      }
      res.json({ message: 'DR Description marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting DR description', details: error.message });
    }
  },
};
