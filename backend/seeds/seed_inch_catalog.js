// Seed para la tabla inch_catalog
const getConnection = require('../db/connection');
const db = getConnection();

const inches = [0.35, 0.75, 1.25, 2.00, 2.50, 3.00, 3.18, 4.00, 5.20, 6.00, 8.00, 9.50];

const values = inches.map(inch => [inch, 1]); // 1 = is_active

const sql = 'INSERT INTO inch_catalog (name, is_active) VALUES ?';

db.query(sql, [values], (err, result) => {
  if (err) {
    console.error('Error insertando datos en inch_catalog:', err);
  } else {
    console.log('Seed de inch_catalog completado:', result.affectedRows, 'filas insertadas.');
  }
  db.end();
});
