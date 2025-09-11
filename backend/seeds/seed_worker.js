const getConnection = require('../db/connection');

const workers = [
  { name: 'Operador Uno', position_id: 1, is_active: true },
  { name: 'Supervisor Uno', position_id: 2, is_active: true }
];

async function seedWorker() {
  const db = getConnection();
  for (const worker of workers) {
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO worker (name, position_id, is_active) VALUES (?, ?, ?)',
        [worker.name, worker.position_id, worker.is_active],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
  db.end();
  console.log('Seed de worker completado.');
}

seedWorker();
