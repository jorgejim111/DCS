const DieSerialHistory = require('../models/DieSerialHistory');

module.exports = {
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
