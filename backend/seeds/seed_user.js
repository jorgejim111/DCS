const getConnection = require('../db/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.JWT_SECRET || 'defaultSecret';

async function seedUser() {
  const db = getConnection();
  // Encripta la contraseña usando bcrypt
  const password = 'Admin123!';
  const hashedPassword = await bcrypt.hash(password, 10);
  // Busca el id del rol admin
  const [roles] = await new Promise((resolve, reject) => {
    db.query('SELECT id FROM role WHERE name = ?', ['admin'], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
  const adminRoleId = roles && roles.length > 0 ? roles[0].id : 1;
  // Inserta el usuario admin
  await new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO user (username, password, role_id) VALUES (?, ?, ?)',
      ['admin', hashedPassword, adminRoleId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
  db.end();
  console.log('Seed de usuario admin completado.');
}

seedUser();
