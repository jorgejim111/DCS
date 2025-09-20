const getConnection = require('../db/connection');

class DamageReport {
  static async getNextId() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT AUTO_INCREMENT as nextId FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = "damage_report"', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]?.nextId || 1);
      });
    });
  }
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM damage_report WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll({ page = 1, pageSize = 20, startDate, endDate }) {
    const db = getConnection();
    const offset = (page - 1) * pageSize;
    let where = '';
    const params = [];
    if (startDate && endDate) {
      where = 'WHERE dr.created_at BETWEEN ? AND ?';
      params.push(startDate + ' 00:00:00', endDate + ' 23:59:59');
    }
    const sql = `
      SELECT dr.id,
        ds.serial_number AS serial,
        DATE_FORMAT(dr.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
        p.name AS product,
        l.name AS line,
        ws.name AS supervisor,
        wo.name AS operator,
        ddesc.name AS description,
        e.name AS explanation,
        dr.note,
        dr.if_sample AS sample,
        s.name AS status,
        dr.verdict,
        DATE_FORMAT(dr.updated_at, '%Y-%m-%d %H:%i:%s') AS updatedAt
      FROM damage_report dr
      LEFT JOIN die_serial ds ON dr.die_serial_id = ds.id
      LEFT JOIN product_catalog p ON dr.product_id = p.id
      LEFT JOIN line_catalog l ON dr.line_id = l.id
      LEFT JOIN worker ws ON dr.supervisor_id = ws.id
      LEFT JOIN worker wo ON dr.operator_id = wo.id
      LEFT JOIN description_dr_catalog ddesc ON dr.description_dr_id = ddesc.id
      LEFT JOIN explanation_catalog e ON dr.explanation_id = e.id
      LEFT JOIN status_catalog s ON dr.status_id = s.id
      ${where}
  ORDER BY dr.id DESC
      LIMIT ? OFFSET ?
    `;
    params.push(pageSize, offset);
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) {
          db.end();
          return reject(err);
        }
        // Obtener el total para paginación
        const countSql = `SELECT COUNT(*) as total FROM damage_report dr ${where}`;
        db.query(countSql, params.slice(0, where ? 2 : 0), (err2, countRes) => {
          db.end();
          if (err2) return reject(err2);
          resolve({ data: results, total: countRes[0].total });
        });
      });
    });
  }

  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO damage_report (die_serial_id, line_id, product_id, operator_id, supervisor_id, description_dr_id, explanation_id, if_sample, note, status_id, verdict) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.die_serial_id, data.line_id, data.product_id, data.operator_id, data.supervisor_id, data.description_dr_id, data.explanation_id, data.if_sample, data.note, data.status_id, data.verdict], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE damage_report SET die_serial_id = ?, line_id = ?, product_id = ?, operator_id = ?, supervisor_id = ?, description_dr_id = ?, explanation_id = ?, if_sample = ?, note = ?, status_id = ?, verdict = ? WHERE id = ?', [data.die_serial_id, data.line_id, data.product_id, data.operator_id, data.supervisor_id, data.description_dr_id, data.explanation_id, data.if_sample, data.note, data.status_id, data.verdict, id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = DamageReport;
