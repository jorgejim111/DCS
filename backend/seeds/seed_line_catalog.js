// Seed para la tabla line_catalog
const getConnection = require('../db/connection');
const db = getConnection();

const lines = [
  'Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5', 'Line 6', 'Line 7', 'Line 8',
  'Line 9A', 'Line 9B', 'Line 10', 'Line 11', 'Line 12', 'Line 13', 'Line 14', 'Line 16', 'Line 17'
];

const values = lines.map(line => [line, 1]); // 1 = is_active

const sql = 'INSERT INTO line_catalog (name, is_active) VALUES ?';

db.query(sql, [values], (err, result) => {
  if (err) {
    console.error('Error insertando datos en line_catalog:', err);
  } else {
    console.log('Seed de line_catalog completado:', result.affectedRows, 'filas insertadas.');
  }
  db.end();
});
