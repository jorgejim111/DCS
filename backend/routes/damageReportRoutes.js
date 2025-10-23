
const express = require('express');
const router = express.Router();
const DamageReportController = require('../controllers/DamageReportController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Obtener Damage Reports por status_id
router.get('/status/:status_id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr'), DamageReportController.getByStatus);

// Obtener todos los Damage Reports abiertos (status_id = 5)
router.get('/open', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr'), DamageReportController.getOpen);


router.get('/active-ids', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getActiveIds);
router.get('/next/id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getNextId);

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getAll);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.create);
// Obtener Damage Report por ID (debe ir antes de PUT y rutas generales)
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getById);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DamageReportController.update);
router.get('/by-serial/:serial', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getBySerial);
// No se elimina nunca un damage report

module.exports = router;
