const DamageReport = require('../models/DamageReport');
const yup = require('yup');

const damageReportSchema = yup.object().shape({
  // Validar que description_dr_id es requerido y es número
  description_dr_id: yup.number().required('Description of Damage is required'),
  // Puedes agregar aquí otros campos requeridos si lo deseas
});

module.exports = {
  // GET /api/damage-report/active-ids
  async getActiveIds(req, res) {
    try {
      const filter = req.query.filter || '';
      const db = require('../db/connection')();
      let sql = 'SELECT id FROM damage_report WHERE is_active = 1';
      let params = [];
      if (filter) {
        sql += ' AND id LIKE ?';
        params.push(`%${filter}%`);
      }
      db.query(sql, params, (err, results) => {
        db.end();
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.map(r => r.id));
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active damage report ids', details: error.message });
    }
  },
  async getNextId(req, res) {
    try {
      const nextId = await DamageReport.getNextId();
      console.log('DamageReport getNextId:', nextId);
      res.json({ nextId });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching next damage report id', details: error.message });
    }
  },
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
  // GET /api/damage-report/by-serial/:serial
  async getBySerial(req, res) {
    try {
      const { serial } = req.params;
      const report = await DamageReport.findFirstBySerial(serial);
      if (!report) {
        return res.status(404).json({ error: 'Damage report not found for this serial' });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching damage report by serial', details: error.message });
    }
  },
};
