const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Importar rutas
const inchRoutes = require('./routes/inchRoutes');
const partRoutes = require('./routes/partRoutes');
const descriptionRoutes = require('./routes/descriptionRoutes');
const dieDescriptionRoutes = require('./routes/dieDescriptionRoutes');
const dieSerialRoutes = require('./routes/dieSerialRoutes');
const damageReportRoutes = require('./routes/damageReportRoutes');
const statusRoutes = require('./routes/statusRoutes');
const positionRoutes = require('./routes/positionRoutes');
const materialRoutes = require('./routes/materialRoutes');
const productRoutes = require('./routes/productRoutes');
const explanationRoutes = require('./routes/explanationRoutes');
const descriptionDrRoutes = require('./routes/descriptionDrRoutes');
const lineRoutes = require('./routes/lineRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const dieSerialHistoryRoutes = require('./routes/dieSerialHistoryRoutes');

// Montar rutas
app.use('/api/inch', inchRoutes);
app.use('/api/part', partRoutes);
app.use('/api/description', descriptionRoutes);
app.use('/api/die-description', dieDescriptionRoutes);
app.use('/api/die-serial', dieSerialRoutes);
app.use('/api/damage-report', damageReportRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/product', productRoutes);
app.use('/api/explanation', explanationRoutes);
app.use('/api/description-dr', descriptionDrRoutes);
app.use('/api/line', lineRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/user', userRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/die-serial-history', dieSerialHistoryRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Die Control System API is running');
});


module.exports = app;
