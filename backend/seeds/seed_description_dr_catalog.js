// Seed para la tabla description_dr_catalog
const getConnection = require('../db/connection');
const db = getConnection();

const descriptions = [
  'Proudness',
  'Swaged',
  'Chip',
  'Dented',
  'Quality',
  'Thin Land',
  'Other'
];

const values = descriptions.map(description => [description, 1]); // 1 = is_active

const sql = 'INSERT INTO description_dr_catalog (name, is_active) VALUES ?';

db.query(sql, [values], (err, result) => {
  if (err) {
    console.error('Error insertando datos en description_dr_catalog:', err);
  } else {
    console.log('Seed de description_dr_catalog completado:', result.affectedRows, 'filas insertadas.');
  }
  db.end();
});
