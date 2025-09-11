const getConnection = require('../db/connection');

class DieSerialHistory {
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
