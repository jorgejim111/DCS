
const DieSerial = require('../models/DieSerial');
const yup = require('yup');

const dieSerialSchema = yup.object().shape({
  serial_number: yup.string().required('Serial number is required'),
  die_description_id: yup.number().required('Die description ID is required'),
  status_id: yup.number().required('Status ID is required'),
  inner: yup.number().required('Inner is required'),
  outer: yup.number().required('Outer is required'),
  proudness: yup.number().required('Proudness is required'),
});

module.exports = {
  // GET /api/die-serial/:id/details-for-report
  async getDetailsForReport(req, res) {
    try {
      const { id } = req.params;
      const details = await DieSerial.getDetailsForReport(id);
      if (!details) return res.status(404).json({ message: 'Not found' });
      res.json(details);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async activate(req, res) {
    try {
      const { id } = req.params;
      const updated = await require('../models/DieSerial').update(id, { is_active: true });
      if (!updated) {
        return res.status(404).json({ error: 'Die serial not found' });
      }
      res.json({ message: 'Die serial activated' });
    } catch (error) {
      res.status(500).json({ error: 'Error activating die serial', details: error.message });
    }
  },
  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const updated = await require('../models/DieSerial').update(id, { is_active: false });
      if (!updated) {
        return res.status(404).json({ error: 'Die serial not found' });
      }
      res.json({ message: 'Die serial deactivated' });
    } catch (error) {
      res.status(500).json({ error: 'Error deactivating die serial', details: error.message });
    }
  },
  async getAll(req, res) {
    try {
      // Get pagination, order, and status filter params from query
      const { page, limit, orderBy, orderDir, statusFilter } = req.query;
      const serials = await DieSerial.findAll({ page, limit, orderBy, orderDir, statusFilter });
      res.json(serials);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die serials', details: error.message });
    }
  },
  // Obtener solo die serials activos (para selects en frontend)
  async getActive(req, res) {
    try {
      const allSerials = await DieSerial.findAll();
      const activeSerials = Array.isArray(allSerials)
        ? allSerials.filter(s => s.is_active)
        : [];
      res.json(activeSerials);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active die serials', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const serial = await DieSerial.findById(id);
      if (!serial || !serial.is_active) {
        return res.status(404).json({ error: 'Die serial not found' });
      }
      res.json(serial);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die serial', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await dieSerialSchema.validate(req.body);
      const data = req.body;
      const newSerialId = await DieSerial.create({ ...data, is_active: true });
      const newSerial = await DieSerial.findById(newSerialId);
      res.status(201).json(newSerial);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await dieSerialSchema.validate(req.body);
      const data = req.body;
      const updated = await DieSerial.update(id, data);
      if (!updated) {
        return res.status(404).json({ error: 'Die serial not found' });
      }
      res.json({ message: 'Die serial updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await DieSerial.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Die serial not found' });
      }
      res.json({ message: 'Die serial marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting die serial', details: error.message });
    }
  },
};
