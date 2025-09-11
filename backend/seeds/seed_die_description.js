const getConnection = require('../db/connection');

const dieDescriptions = [
  {
    inch_id: 1,
    part_id: 1,
    description_id: 1,
    die_description: 'Die for TS-25-001',
    min_in_circulation: 2,
    min_in_stock: 1
  },
  {
    inch_id: 1,
    part_id: 1,
    description_id: 1,
    die_description: 'Die for TS-25-002',
    min_in_circulation: 2,
    min_in_stock: 1
  }
];

async function seedDieDescription() {
  const db = getConnection();
  for (const desc of dieDescriptions) {
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO die_description (inch_id, part_id, description_id, die_description, min_in_circulation, min_in_stock, is_active) VALUES (?, ?, ?, ?, ?, ?, TRUE)',
        [desc.inch_id, desc.part_id, desc.description_id, desc.die_description, desc.min_in_circulation, desc.min_in_stock],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
  db.end();
  console.log('Seed de die_description completado.');
}

seedDieDescription();
