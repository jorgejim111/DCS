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
      // Accept options for pagination and order
      const args = arguments[0] || {};
      const page = parseInt(args.page) || 1;
      const limit = parseInt(args.limit) || 20;
      const offset = (page - 1) * limit;
      // Permitir ordenar por die_description.name
      let orderBy = args.orderBy || 'die_description';
      const orderDir = args.orderDir === 'ASC' ? 'ASC' : 'DESC';
      let orderClause;
      if (orderBy === 'die_description') {
        orderClause = `die_description.die_description ${orderDir}`;
      } else {
        orderClause = `die_serial.${orderBy} ${orderDir}`;
      }
      const query = `SELECT die_serial.*, die_description.die_description AS die_description_text, status_catalog.name AS status_name FROM die_serial
        LEFT JOIN die_description ON die_serial.die_description_id = die_description.id
        LEFT JOIN status_catalog ON die_serial.status_id = status_catalog.id
        ORDER BY ${orderClause} LIMIT ? OFFSET ?`;
      db.query(query, [limit, offset], (err, results) => {
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
      let query, params;
      if (Object.keys(data).length === 1 && data.hasOwnProperty('is_active')) {
        query = 'UPDATE die_serial SET is_active = ? WHERE id = ?';
        params = [data.is_active, id];
      } else {
        query = 'UPDATE die_serial SET serial_number = ?, die_description_id = ?, status_id = ?, `inner` = ?, `outer` = ?, `proudness` = ? WHERE id = ?';
        params = [data.serial_number, data.die_description_id, data.status_id, data.inner, data.outer, data.proudness, id];
      }
      db.query(query, params, (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = DieSerial;
