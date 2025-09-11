const getConnection = require('../db/connection');

const materials = [
  { name: 'Acero', is_active: true },
  { name: 'Aluminio', is_active: true }
];

async function seedMaterialCatalog() {
  const db = getConnection();
  for (const material of materials) {
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO material_catalog (name, is_active) VALUES (?, ?)',
        [material.name, material.is_active],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
  db.end();
  console.log('Seed de material_catalog completado.');
}

seedMaterialCatalog();
