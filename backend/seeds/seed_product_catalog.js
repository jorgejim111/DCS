const getConnection = require('../db/connection');

const products = [
  { name: 'Producto A', is_active: true },
  { name: 'Producto B', is_active: true }
];

async function seedProductCatalog() {
  const db = getConnection();
  for (const prod of products) {
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO product_catalog (name, is_active) VALUES (?, ?)',
        [prod.name, prod.is_active],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
  db.end();
  console.log('Seed de product_catalog completado.');
}

seedProductCatalog();
