const getConnection = require('../db/connection');

class DieDescription {
  static async updateActive(id, is_active) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE die_description SET is_active = ? WHERE id = ?', [is_active, id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
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
      db.query(`
        SELECT d.id,
               i.name AS inch,
               p.name AS part,
               dc.name AS description,
               d.die_description,
               d.min_in_circulation,
               d.min_in_stock,
               d.is_active,
               d.created_at,
               d.updated_at
        FROM die_description d
        LEFT JOIN inch_catalog i ON d.inch_id = i.id
        LEFT JOIN part_catalog p ON d.part_id = p.id
        LEFT JOIN description_catalog dc ON d.description_id = dc.id
      `, (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async findAllRaw() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT d.id,
               i.name AS inch,
               p.name AS part,
               dc.name AS description,
               d.die_description,
               d.min_in_circulation,
               d.min_in_stock,
               d.is_active,
               d.created_at,
               d.updated_at
        FROM die_description d
        LEFT JOIN inch_catalog i ON d.inch_id = i.id
        LEFT JOIN part_catalog p ON d.part_id = p.id
        LEFT JOIN description_catalog dc ON d.description_id = dc.id
      `, (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async findActive() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT d.id,
               i.name AS inch,
               p.name AS part,
               dc.name AS description,
               d.die_description,
               d.min_in_circulation,
               d.min_in_stock,
               d.is_active,
               d.created_at,
               d.updated_at
        FROM die_description d
        LEFT JOIN inch_catalog i ON d.inch_id = i.id
        LEFT JOIN part_catalog p ON d.part_id = p.id
        LEFT JOIN description_catalog dc ON d.description_id = dc.id
        WHERE d.is_active = TRUE
      `, (err, results) => {
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
      // Si solo se pasa is_active, actualiza solo ese campo
      if (Object.keys(data).length === 1 && data.hasOwnProperty('is_active')) {
        db.query('UPDATE die_description SET is_active = ? WHERE id = ?', [data.is_active, id], (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results.affectedRows > 0);
        });
      } else {
        db.query('UPDATE die_description SET inch_id = ?, part_id = ?, description_id = ?, die_description = ?, min_in_circulation = ?, min_in_stock = ? WHERE id = ?', [data.inch_id, data.part_id, data.description_id, data.die_description, data.min_in_circulation, data.min_in_stock, id], (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results.affectedRows > 0);
        });
      }
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
