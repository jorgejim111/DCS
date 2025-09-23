const DieSerialHistory = require('../models/DieSerialHistory');

module.exports = {
  // Crear nuevo registro en die_serial_history
  async create(req, res) {
    try {
      const data = req.body;
      const newId = await require('../models/DieSerialHistory').create(data);
      res.status(201).json({ id: newId });
    } catch (error) {
      res.status(400).json({ error: 'Error creating die serial history', details: error.message });
    }
  },
  // Obtener todo el historial
  async getAll(req, res) {
    try {
      const history = await DieSerialHistory.findAll();
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die serial history', details: error.message });
    }
  },
  // Obtener historial por serial_id
  async getBySerialId(req, res) {
    try {
      const { serial_id } = req.params;
      const history = await DieSerialHistory.findBySerialId(serial_id);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die serial history by serial', details: error.message });
    }
  },
};
