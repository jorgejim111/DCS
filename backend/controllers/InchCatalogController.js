  // ...existing code...

const InchCatalog = require('../models/InchCatalog');
const yup = require('yup');

const inchSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  // Obtener solo pulgadas activas (para selects en frontend)
  async getActive(req, res) {
    try {
      const inches = await InchCatalog.findAll({ where: { is_active: true } });
      res.json(inches);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active inches', details: error.message });
    }
  },
  async getAllRaw(req, res) {
    try {
      const inches = await InchCatalog.findAllRaw();
      res.json(inches);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all inches', details: error.message });
    }
  },
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
      // Si solo se envía is_active, activar/desactivar
      if ('is_active' in req.body && Object.keys(req.body).length === 1) {
        const updated = await InchCatalog.update(id, { is_active: req.body.is_active });
        if (!updated) {
          return res.status(404).json({ error: 'Inch not found' });
        }
        return res.json({ message: `Inch ${req.body.is_active ? 'activated' : 'deactivated'}` });
      }
      // Si se envía name (y opcionalmente is_active)
      if ('name' in req.body) {
        await inchSchema.validate({ name: req.body.name });
        const updateData = { name: req.body.name };
        if ('is_active' in req.body) updateData.is_active = req.body.is_active;
        const updated = await InchCatalog.update(id, updateData);
        if (!updated) {
          return res.status(404).json({ error: 'Inch not found' });
        }
        return res.json({ message: 'Inch updated' });
      }
      return res.status(400).json({ error: 'No valid fields to update' });
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
