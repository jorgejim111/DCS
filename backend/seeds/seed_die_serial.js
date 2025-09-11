const getConnection = require('../db/connection');

const serials = [
  {
    serial_number: 'TS-25-001',
    die_description_id: 1,
    status_id: 1,
    inner: 0,
    outer: 0,
    proudness: 0
  },
  {
    serial_number: 'TS-25-002',
    die_description_id: 2,
    status_id: 1,
    inner: 0,
    outer: 0,
    proudness: 0
  }
];

async function seedDieSerial() {
  const db = getConnection();
  for (const serial of serials) {
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO die_serial (serial_number, die_description_id, status_id, `inner`, `outer`, `proudness`) VALUES (?, ?, ?, ?, ?, ?)',
        [serial.serial_number, serial.die_description_id, serial.status_id, serial.inner, serial.outer, serial.proudness],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
  db.end();
  console.log('Seed de die_serial completado.');
}

seedDieSerial();
