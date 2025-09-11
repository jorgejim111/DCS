// Seed para la tabla description_catalog
const getConnection = require('../db/connection');
const db = getConnection();

const descriptions = [
  'RB', 'RE', 'SQ', 'TR', 'HO', 'TI', 'TR1', 'RBA', 'FILM', 'REC', 'TR2', 'TWILL 3', 'RE/SQ'
];

const values = descriptions.map(description => [description, 1]); // 1 = is_active

const sql = 'INSERT INTO description_catalog (name, is_active) VALUES ?';

db.query(sql, [values], (err, result) => {
  if (err) {
    console.error('Error insertando datos en description_catalog:', err);
  } else {
    console.log('Seed de description_catalog completado:', result.affectedRows, 'filas insertadas.');
  }
  db.end();
});
