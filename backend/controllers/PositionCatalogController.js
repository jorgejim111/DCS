const PositionCatalog = require('../models/PositionCatalog');
const yup = require('yup');

const positionSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

module.exports = {
  // Obtener solo posiciones activas (para selects en frontend)
  async getActive(req, res) {
    try {
      const positions = await PositionCatalog.findAll({ where: { is_active: true } });
      res.json(positions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active positions', details: error.message });
    }
  },
  async getAllRaw(req, res) {
    try {
      const positions = await PositionCatalog.findAllRaw();
      res.json(positions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching all positions', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const positions = await PositionCatalog.findAll({ where: { is_active: true } });
      res.json(positions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching positions', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const position = await PositionCatalog.findById(id);
      if (!position || !position.is_active) {
        return res.status(404).json({ error: 'Position not found' });
      }
      res.json(position);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching position', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await positionSchema.validate(req.body);
      const { name } = req.body;
      const newPosition = await PositionCatalog.create({ name, is_active: true });
      res.status(201).json(newPosition);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      // Si solo se envía is_active, desactivar/activar
      if ('is_active' in req.body && Object.keys(req.body).length === 1) {
        if (req.body.is_active === false) {
          const updated = await PositionCatalog.deactivate(id);
          if (!updated) {
            return res.status(404).json({ error: 'Position not found' });
          }
          return res.json({ message: 'Position deactivated' });
        } else if (req.body.is_active === true) {
          // Reactivar
          const db = require('../models/PositionCatalog');
          const updated = await db.update(id, { name: undefined, is_active: true });
          if (!updated) {
            return res.status(404).json({ error: 'Position not found' });
          }
          return res.json({ message: 'Position activated' });
        }
      }
      // Si se envía name, actualizar nombre
      await positionSchema.validate(req.body);
      const { name } = req.body;
      const updated = await PositionCatalog.update(id, { name });
      if (!updated) {
        return res.status(404).json({ error: 'Position not found' });
      }
      res.json({ message: 'Position updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await PositionCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Position not found' });
      }
      res.json({ message: 'Position marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting position', details: error.message });
    }
  },
};
