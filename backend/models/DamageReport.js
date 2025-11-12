const getConnection = require('../db/connection');

class DamageReport {
  // Obtener los datos crudos (IDs) y los nombres descriptivos de un Damage Report
  static async findRawById(id) {
    const db = getConnection();
    const sql = `
      SELECT dr.id,
        dr.die_serial_id,
        ds.serial_number,
        dr.line_id,
        l.name AS line_name,
        dr.product_id,
        p.name AS product_name,
        dr.operator_id,
        wo.name AS operator_name,
        dr.supervisor_id,
        ws.name AS supervisor_name,
        dr.description_dr_id,
        ddesc.name AS description_dr,
        dr.explanation_id,
        e.name AS explanation,
        dr.if_sample,
        dr.note,
        dr.status_id,
        dr.verdict,
        dr.created_at,
        dr.updated_at
      FROM damage_report dr
      LEFT JOIN die_serial ds ON dr.die_serial_id = ds.id
      LEFT JOIN product_catalog p ON dr.product_id = p.id
      LEFT JOIN line_catalog l ON dr.line_id = l.id
      LEFT JOIN worker ws ON dr.supervisor_id = ws.id
      LEFT JOIN worker wo ON dr.operator_id = wo.id
      LEFT JOIN description_dr_catalog ddesc ON dr.description_dr_id = ddesc.id
      LEFT JOIN explanation_catalog e ON dr.explanation_id = e.id
      WHERE dr.id = ?
      LIMIT 1
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
  // Obtener todos los Damage Reports abiertos (status_id = 4)
  static async findOpen() {
    const db = getConnection();
    const sql = `SELECT id, status_id AS id_status FROM damage_report WHERE status_id = 4 ORDER BY id ASC`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
  // ...existing code...
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Obtener todos los Damage Reports por status_id
  static async findByStatus(status_id) {
    const db = getConnection();
    const sql = `SELECT id, status_id AS id_status FROM damage_report WHERE status_id = ? ORDER BY id ASC`;
    return new Promise((resolve, reject) => {
      db.query(sql, [status_id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  // Obtener todos los Damage Reports abiertos (status_id = 5)
  static async findOpen() {
    const db = getConnection();
    const sql = `SELECT id, status_id AS id_status FROM damage_report WHERE status_id = 4 ORDER BY id ASC`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
  // ...existing code...
        db.end();
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async getNextId() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT IFNULL(MAX(id), 0) + 1 AS nextId FROM damage_report', (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]?.nextId || 1);
      });
    });
  }
  static async findById(id) {
    const db = getConnection();
    const sql = `
      SELECT dr.id,
        ds.serial_number,
        p.name AS product_name,
        l.name AS line_name,
        ws.name AS supervisor_name,
        wo.name AS operator_name,
        ddesc.name AS description_dr,
        e.name AS explanation,
        dr.note,
        dr.if_sample,
        dr.status_id,
        dr.verdict,
        dr.created_at,
        dr.updated_at,
        dd.die_description,
        i.name AS inch,
        pa.name AS part,
        dc.name AS description
      FROM damage_report dr
      LEFT JOIN die_serial ds ON dr.die_serial_id = ds.id
      LEFT JOIN die_description dd ON ds.die_description_id = dd.id
      LEFT JOIN inch_catalog i ON dd.inch_id = i.id
      LEFT JOIN part_catalog pa ON dd.part_id = pa.id
      LEFT JOIN description_catalog dc ON dd.description_id = dc.id
      LEFT JOIN product_catalog p ON dr.product_id = p.id
      LEFT JOIN line_catalog l ON dr.line_id = l.id
      LEFT JOIN worker ws ON dr.supervisor_id = ws.id
      LEFT JOIN worker wo ON dr.operator_id = wo.id
      LEFT JOIN description_dr_catalog ddesc ON dr.description_dr_id = ddesc.id
      LEFT JOIN explanation_catalog e ON dr.explanation_id = e.id
      WHERE dr.id = ?
      LIMIT 1
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll({ page = 1, pageSize = 20, startDate, endDate }) {
    const db = getConnection();
    const offset = (page - 1) * pageSize;
    let where = '';
    const params = [];
    if (startDate && endDate) {
      where = 'WHERE dr.created_at BETWEEN ? AND ?';
      params.push(startDate + ' 00:00:00', endDate + ' 23:59:59');
    }
    const sql = `
      SELECT dr.id,
        ds.serial_number AS serial,
        DATE_FORMAT(dr.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
        p.name AS product,
        l.name AS line,
        ws.name AS supervisor,
        wo.name AS operator,
        ddesc.name AS description,
        e.name AS explanation,
        dr.note,
        dr.if_sample AS sample,
        s.name AS status,
        dr.verdict,
        DATE_FORMAT(dr.updated_at, '%Y-%m-%d %H:%i:%s') AS updatedAt
      FROM damage_report dr
      LEFT JOIN die_serial ds ON dr.die_serial_id = ds.id
      LEFT JOIN product_catalog p ON dr.product_id = p.id
      LEFT JOIN line_catalog l ON dr.line_id = l.id
      LEFT JOIN worker ws ON dr.supervisor_id = ws.id
      LEFT JOIN worker wo ON dr.operator_id = wo.id
      LEFT JOIN description_dr_catalog ddesc ON dr.description_dr_id = ddesc.id
      LEFT JOIN explanation_catalog e ON dr.explanation_id = e.id
      LEFT JOIN status_catalog s ON dr.status_id = s.id
      ${where}
  ORDER BY dr.id DESC
      LIMIT ? OFFSET ?
    `;
    params.push(pageSize, offset);
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) {
          db.end();
          return reject(err);
        }
        // Obtener el total para paginación
        const countSql = `SELECT COUNT(*) as total FROM damage_report dr ${where}`;
        db.query(countSql, params.slice(0, where ? 2 : 0), (err2, countRes) => {
          db.end();
          if (err2) return reject(err2);
          resolve({ data: results, total: countRes[0].total });
        });
      });
    });
  }

  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO damage_report (die_serial_id, line_id, product_id, operator_id, supervisor_id, description_dr_id, explanation_id, if_sample, note, status_id, verdict) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.die_serial_id, data.line_id, data.product_id, data.operator_id, data.supervisor_id, data.description_dr_id, data.explanation_id, data.if_sample, data.note, data.status_id, data.verdict], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('UPDATE damage_report SET die_serial_id = ?, line_id = ?, product_id = ?, operator_id = ?, supervisor_id = ?, description_dr_id = ?, explanation_id = ?, if_sample = ?, note = ?, status_id = ?, verdict = ? WHERE id = ?', [data.die_serial_id, data.line_id, data.product_id, data.operator_id, data.supervisor_id, data.description_dr_id, data.explanation_id, data.if_sample, data.note, data.status_id, data.verdict, id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }

  // Buscar el primer damage_report por die_serial_id (id numérico)
  static async findFirstBySerial(die_serial_id) {
    const db = getConnection();
    const sql = `
      SELECT dr.* FROM damage_report dr
      WHERE dr.die_serial_id = ?
      ORDER BY dr.id ASC
      LIMIT 1
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [die_serial_id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = DamageReport;
