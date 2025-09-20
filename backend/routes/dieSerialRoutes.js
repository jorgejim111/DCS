const express = require('express');
const router = express.Router();
const DieSerialController = require('../controllers/DieSerialController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

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
