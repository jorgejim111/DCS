const getConnection = require('../db/connection');

class Worker {
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM worker WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM worker', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO worker (name, position_id, user_id, is_active) VALUES (?, ?, ?, ?)', [data.name, data.position_id, data.user_id, data.is_active], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE worker SET name = ?, position_id = ?, user_id = ?, is_active = ? WHERE id = ?', [data.name, data.position_id, data.user_id, data.is_active, id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Worker;
