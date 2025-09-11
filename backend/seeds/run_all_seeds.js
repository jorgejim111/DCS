const { exec } = require('child_process');

const seeds = [
  'seed_description_catalog.js',
  'seed_description_dr_catalog.js',
  'seed_explanation_catalog.js',
  'seed_inch_catalog.js',
  'seed_line_catalog.js',
  'seed_part_catalog.js',
  'seed_position_catalog.js',
  'seed_status_catalog.js'
];

function runSeed(seed) {
  return new Promise((resolve, reject) => {
    exec(`node ${__dirname}/${seed}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando ${seed}:`, stderr);
        reject(error);
      } else {
        console.log(`✔ ${seed} ejecutado correctamente.`);
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function runAllSeeds() {
  for (const seed of seeds) {
    try {
      await runSeed(seed);
    } catch (err) {
      console.error(`Fallo en el seed: ${seed}`);
      process.exit(1);
    }
  }
  console.log('Todos los seeds ejecutados.');
}

runAllSeeds();