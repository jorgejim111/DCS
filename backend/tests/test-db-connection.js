const getConnection = require('../db/connection');

const connection = getConnection();

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err.message);
    process.exit(1);
  }
  console.log('Conexión a MySQL exitosa');
  connection.end();
});
