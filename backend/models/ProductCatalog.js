const getConnection = require('../db/connection');

class ProductCatalog {
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product_catalog WHERE id = ?', [id], (err, results) => {
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
        SELECT p.id, p.name, p.is_active,
               p.die_description_id,
               d.die_description AS die_description,
               p.material_id,
               m.name AS material
        FROM product_catalog p
        LEFT JOIN die_description d ON p.die_description_id = d.id
        LEFT JOIN material_catalog m ON p.material_id = m.id
      `, (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create({ name, die_description_id, material_id, is_active }) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO product_catalog (name, die_description_id, material_id, is_active) VALUES (?, ?, ?, ?)',
        [name, die_description_id, material_id, is_active],
        (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      // Si solo se pasa is_active, actualiza solo ese campo
      if (Object.keys(data).length === 1 && data.hasOwnProperty('is_active')) {
        db.query(
          'UPDATE product_catalog SET is_active = ? WHERE id = ?',
          [data.is_active, id],
          (err, results) => {
            db.end();
            if (err) return reject(err);
            resolve(results.affectedRows > 0);
          }
        );
      } else {
        const { name, die_description_id, material_id, is_active } = data;
        db.query(
          'UPDATE product_catalog SET name = ?, die_description_id = ?, material_id = ?, is_active = ? WHERE id = ?',
          [name, die_description_id, material_id, is_active, id],
          (err, results) => {
            db.end();
            if (err) return reject(err);
            resolve(results.affectedRows > 0);
          }
        );
      }
    });
  }

  static async deactivate(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE product_catalog SET is_active = FALSE WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }

  static async findActive() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product_catalog WHERE is_active = TRUE', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = ProductCatalog;
