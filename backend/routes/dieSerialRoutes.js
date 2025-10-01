const express = require('express');
const router = express.Router();
const DieSerialController = require('../controllers/DieSerialController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const DieSerial = require('../models/DieSerial'); // <--- Importar aquí

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.getActive);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.getById);
router.get('/:id/details-for-report', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.getDetailsForReport);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.update);
router.patch('/:id/activate', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.activate);
router.patch('/:id/deactivate', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialController.deactivate);
// No se elimina nunca un serial

module.exports = router;

// Historial por serial_number (string, no id)
const DieSerialHistory = require('../models/DieSerialHistory');
router.get('/history/:serial_number', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), async (req, res) => {
  try {
    const serial_number = req.params.serial_number;
    // Buscar el die_serial correspondiente
    const die = await DieSerial.findBySerialNumber(serial_number);
    if (!die) return res.status(404).json({ message: 'Serial not found' });
    const history = await DieSerialHistory.findBySerialId(die.id);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
