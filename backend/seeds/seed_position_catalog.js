// Seed para la tabla position_catalog
const getConnection = require('../db/connection');
const db = getConnection();

const positions = [
  'Supervisor',
  'Lead Head',
  'Set up Technician',
  'Machine Operator',
  'Process Operator',
  'Maintenance Technician',
  'Maintenance Manager',
  'Plant Manager',
  'Director of Technology',
  'Project Manager'
];

const values = positions.map(position => [position, 1]); // 1 = is_active

const sql = 'INSERT INTO position_catalog (name, is_active) VALUES ?';

db.query(sql, [values], (err, result) => {
  if (err) {
    console.error('Error insertando datos en position_catalog:', err);
  } else {
    console.log('Seed de position_catalog completado:', result.affectedRows, 'filas insertadas.');
  }
  db.end();
});
