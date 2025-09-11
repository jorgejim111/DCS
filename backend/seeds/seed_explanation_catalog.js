// Seed para la tabla explanation_catalog
const getConnection = require('../db/connection');
const db = getConnection();

const explanations = [
  'Dropped',
  'Hit with Tool',
  'Over Adjusted',
  'Other'
];

const values = explanations.map(explanation => [explanation, 1]); // 1 = is_active

const sql = 'INSERT INTO explanation_catalog (name, is_active) VALUES ?';

db.query(sql, [values], (err, result) => {
  if (err) {
    console.error('Error insertando datos en explanation_catalog:', err);
  } else {
    console.log('Seed de explanation_catalog completado:', result.affectedRows, 'filas insertadas.');
  }
  db.end();
});
