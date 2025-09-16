const DamageReport = require('../models/DamageReport');
const yup = require('yup');

const damageReportSchema = yup.object().shape({
  // Agrega aquí los campos requeridos según el modelo
  description: yup.string().required('Description is required'),
});

module.exports = {
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const result = await DamageReport.findAll({ page, pageSize, startDate, endDate });
      res.json({
        data: result.data,
        total: result.total,
        page,
        pageCount: Math.ceil(result.total / pageSize)
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching damage reports', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const report = await DamageReport.findById(id);
      if (!report) {
        return res.status(404).json({ error: 'Damage report not found' });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching damage report', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await damageReportSchema.validate(req.body);
      const data = req.body;
      const newReport = await DamageReport.create(data);
      res.status(201).json(newReport);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await damageReportSchema.validate(req.body);
      const data = req.body;
      const updated = await DamageReport.update(id, data);
      if (!updated) {
        return res.status(404).json({ error: 'Damage report not found' });
      }
      res.json({ message: 'Damage report updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
};
