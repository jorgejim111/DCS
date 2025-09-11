const express = require('express');
const router = express.Router();
const DieSerialHistoryController = require('../controllers/DieSerialHistoryController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'user'), DieSerialHistoryController.getAll);
router.get('/serial/:serial_id', authenticateToken, authorizeRoles('admin', 'user'), DieSerialHistoryController.getBySerialId);

module.exports = router;
