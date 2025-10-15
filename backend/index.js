const app = require('./app');
const PORT = process.env.PORT || 3000;

// Listen on all interfaces for LAN access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT} (LAN)`);
});
