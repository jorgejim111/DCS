const getConnection = require('../db/connection');

class DamageReport {
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

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM damage_report', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
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
