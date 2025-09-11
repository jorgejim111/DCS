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
  async getAll(req, res) {
    try {
      const serials = await DieSerial.findAll({ where: { is_active: true } });
      res.json(serials);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching die serials', details: error.message });
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
