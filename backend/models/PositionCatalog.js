const getConnection = require('../db/connection');

class PositionCatalog {
  static async findAllRaw() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM position_catalog', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM position_catalog WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM position_catalog WHERE is_active = TRUE', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(name) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      const posName = typeof name === 'object' ? name.name : name;
      const isActive = typeof name === 'object' && 'is_active' in name ? name.is_active : true;
      db.query('INSERT INTO position_catalog (name, is_active) VALUES (?, ?)', [posName, isActive], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, name) {
    const db = getConnection();
    let query = 'UPDATE position_catalog SET ';
    let params = [];
    if (typeof name === 'object') {
      const fields = [];
      if ('name' in name && name.name !== undefined) {
        fields.push('name = ?');
        params.push(name.name);
      }
      if ('is_active' in name) {
        fields.push('is_active = ?');
        params.push(name.is_active);
      }
      query += fields.join(', ') + ' WHERE id = ?';
      params.push(id);
    } else {
      query += 'name = ? WHERE id = ?';
      params = [name, id];
    }
    return new Promise((resolve, reject) => {
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
      db.query('UPDATE position_catalog SET is_active = FALSE WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = PositionCatalog;
