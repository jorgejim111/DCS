// Seed para la tabla status_catalog
const getConnection = require('../db/connection');
const db = getConnection();

const statuses = [
  'New',
  'Circulation',
  'Scraped',
  'Damage Report'
];

const values = statuses.map(status => [status, 1]); // 1 = is_active

const sql = 'INSERT INTO status_catalog (name, is_active) VALUES ?';

db.query(sql, [values], (err, result) => {
  if (err) {
    console.error('Error insertando datos en status_catalog:', err);
  } else {
    console.log('Seed de status_catalog completado:', result.affectedRows, 'filas insertadas.');
  }
  db.end();
});
