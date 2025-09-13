const getConnection = require('../db/connection');

class MaterialCatalog {
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM material_catalog WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM material_catalog', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async findActive() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM material_catalog WHERE is_active = TRUE', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(name) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      const matName = typeof name === 'object' ? name.name : name;
      const isActive = typeof name === 'object' && 'is_active' in name ? name.is_active : true;
      db.query('INSERT INTO material_catalog (name, is_active) VALUES (?, ?)', [matName, isActive], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      if (data.hasOwnProperty('is_active') && !data.hasOwnProperty('name')) {
        db.query('UPDATE material_catalog SET is_active = ? WHERE id = ?', [data.is_active, id], (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results.affectedRows > 0);
        });
      } else if (data.hasOwnProperty('name') && !data.hasOwnProperty('is_active')) {
        db.query('UPDATE material_catalog SET name = ? WHERE id = ?', [data.name, id], (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results.affectedRows > 0);
        });
      } else if (data.hasOwnProperty('name') && data.hasOwnProperty('is_active')) {
        db.query('UPDATE material_catalog SET name = ?, is_active = ? WHERE id = ?', [data.name, data.is_active, id], (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results.affectedRows > 0);
        });
      } else {
        db.end();
        resolve(false);
      }
    });
  }

  static async deactivate(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE material_catalog SET is_active = FALSE WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = MaterialCatalog;
