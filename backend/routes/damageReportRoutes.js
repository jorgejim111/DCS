const express = require('express');
const router = express.Router();
const DamageReportController = require('../controllers/DamageReportController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');


router.get('/active-ids', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getActiveIds);
router.get('/next/id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getNextId);

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DamageReportController.update);
router.get('/by-serial/:serial', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DamageReportController.getBySerial);
// No se elimina nunca un damage report

module.exports = router;
