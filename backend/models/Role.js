const getConnection = require('../db/connection');

class Role {
  static async findAllRaw() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM role', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM role WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM role', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      const roleName = typeof data === 'object' ? data.name : data;
      const isActive = typeof data === 'object' && 'is_active' in data ? data.is_active : true;
      db.query('INSERT INTO role (name, is_active) VALUES (?, ?)', [roleName, isActive], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      let query = 'UPDATE role SET ';
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
}

module.exports = Role;
