const LineCatalog = require('../models/LineCatalog');
const yup = require('yup');

// Esquema de validación para una línea
const lineSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  // Obtener todas las líneas activas
  async getAll(req, res) {
    try {
      const lines = await LineCatalog.findAll({ where: { is_active: true } });
      res.json(lines);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching lines', details: error.message });
    }
  },

  // Obtener una línea por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const line = await LineCatalog.findById(id);
      if (!line || !line.is_active) {
        return res.status(404).json({ error: 'Line not found' });
      }
      res.json(line);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching line', details: error.message });
    }
  },

  // Crear una nueva línea
  async create(req, res) {
    try {
      await lineSchema.validate(req.body);
      const { name } = req.body;
      const newLine = await LineCatalog.create({ name, is_active: true });
      res.status(201).json(newLine);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },

  // Actualizar una línea existente
  async update(req, res) {
    try {
      const { id } = req.params;
      await lineSchema.validate(req.body);
      const { name } = req.body;
      const updated = await LineCatalog.update(id, { name });
      if (!updated) {
        return res.status(404).json({ error: 'Line not found' });
      }
      res.json({ message: 'Line updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },

  // Marcar una línea como inactiva (borrado lógico)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await LineCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Line not found' });
      }
      res.json({ message: 'Line marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting line', details: error.message });
    }
  },
};
