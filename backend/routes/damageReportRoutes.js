const express = require('express');
const router = express.Router();
const DamageReportController = require('../controllers/DamageReportController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'produccion'), DamageReportController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'produccion'), DamageReportController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'produccion'), DamageReportController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DamageReportController.update);
// No se elimina nunca un damage report

module.exports = router;
