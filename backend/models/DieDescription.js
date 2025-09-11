const getConnection = require('../db/connection');

class DieDescription {
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM die_description WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM die_description WHERE is_active = TRUE', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO die_description (inch_id, part_id, description_id, die_description, min_in_circulation, min_in_stock) VALUES (?, ?, ?, ?, ?, ?)', [data.inch_id, data.part_id, data.description_id, data.die_description, data.min_in_circulation, data.min_in_stock], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE die_description SET inch_id = ?, part_id = ?, description_id = ?, die_description = ?, min_in_circulation = ?, min_in_stock = ? WHERE id = ?', [data.inch_id, data.part_id, data.description_id, data.die_description, data.min_in_circulation, data.min_in_stock, id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }

  static async deactivate(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE die_description SET is_active = FALSE WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = DieDescription;
