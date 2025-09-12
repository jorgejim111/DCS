const getConnection = require('../db/connection');

class LineCatalog {
  static async findAllRaw() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM line_catalog', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM line_catalog WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM line_catalog WHERE is_active = TRUE', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(name) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      const lineName = typeof name === 'object' ? name.name : name;
      const isActive = typeof name === 'object' && 'is_active' in name ? name.is_active : true;
      db.query('INSERT INTO line_catalog (name, is_active) VALUES (?, ?)', [lineName, isActive], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      let query = 'UPDATE line_catalog SET ';
      const fields = [];
      const params = [];
      if (typeof data === 'object') {
        if ('name' in data) {
          fields.push('name = ?');
          params.push(data.name);
        }
        if ('is_active' in data) {
          fields.push('is_active = ?');
          params.push(data.is_active);
        }
      }
      if (fields.length === 0) {
        db.end();
        return resolve(false);
      }
      query += fields.join(', ') + ' WHERE id = ?';
      params.push(id);
      db.query(query, params, (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }

  static async deactivate(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE line_catalog SET is_active = FALSE WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = LineCatalog;
