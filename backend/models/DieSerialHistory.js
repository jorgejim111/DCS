const getConnection = require('../db/connection');

class DieSerialHistory {
  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO die_serial_history (
          die_serial_id, status_id, note, damage_report_id, observed_damage_id, performed_by, product_id, line_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.die_serial_id,
          data.status_id,
          data.note,
          data.damage_report_id,
          data.observed_damage_id,
          data.performed_by,
          data.product_id,
          data.line_id
        ],
        (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM die_serial_history WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM die_serial_history', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async findBySerialId(die_serial_id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM die_serial_history WHERE die_serial_id = ?', [die_serial_id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = DieSerialHistory;
