const express = require('express');
const router = express.Router();
const DieSerialHistoryController = require('../controllers/DieSerialHistoryController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');


router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialHistoryController.getAll);
router.get('/serial/:serial_id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialHistoryController.getBySerialId);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DieSerialHistoryController.create);

module.exports = router;
