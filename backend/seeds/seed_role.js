const getConnection = require('../db/connection');

const roles = [
  { name: 'admin' },
  { name: 'gerente' },
  { name: 'setupSr' },
  { name: 'setup' },
  { name: 'produccion' }
];

async function seedRole() {
  const db = getConnection();
  for (const role of roles) {
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO role (name) VALUES (?)',
        [role.name],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
  db.end();
  console.log('Seed de role completado.');
}

seedRole();
