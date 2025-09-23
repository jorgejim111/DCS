const express = require('express');
const router = express.Router();
const DieSerialHistoryController = require('../controllers/DieSerialHistoryController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');


router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DieSerialHistoryController.getAll);
router.get('/serial/:serial_id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DieSerialHistoryController.getBySerialId);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DieSerialHistoryController.create);

module.exports = router;
