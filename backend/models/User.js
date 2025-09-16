
const getConnection = require('../db/connection');

class User {
  static async findById(id) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findAll() {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT u.id, u.username, r.name AS role, u.role_id FROM user u JOIN role r ON u.role_id = r.id',
        (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  static async findByUsername(username) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT u.*, r.name AS role FROM user u JOIN role r ON u.role_id = r.id WHERE u.username = ?',
        [username],
        (err, results) => {
          db.end();
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static async create(data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO user (username, password, role_id) VALUES (?, ?, ?)', [data.username, data.password, data.role_id], (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  }

  static async update(id, data) {
    const db = getConnection();
    return new Promise((resolve, reject) => {
      let fields = ['username = ?', 'role_id = ?'];
      let values = [data.username, data.role_id];
      if (data.password) {
        fields.push('password = ?');
        values.push(data.password);
      }
      values.push(id);
      db.query(`UPDATE user SET ${fields.join(', ')} WHERE id = ?`, values, (err, results) => {
        db.end();
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = User;
