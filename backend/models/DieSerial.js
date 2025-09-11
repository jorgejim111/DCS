const getConnection = require('../db/connection');

class DieSerial {
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM die_serial WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM die_serial', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO die_serial (serial_number, die_description_id, status_id, `inner`, `outer`, `proudness`) VALUES (?, ?, ?, ?, ?, ?)', [data.serial_number, data.die_description_id, data.status_id, data.inner, data.outer, data.proudness], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE die_serial SET serial_number = ?, die_description_id = ?, status_id = ?, `inner` = ?, `outer` = ?, `proudness` = ? WHERE id = ?', [data.serial_number, data.die_description_id, data.status_id, data.inner, data.outer, data.proudness, id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = DieSerial;
