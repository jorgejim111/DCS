const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), RoleController.getAll);
router.get('/all', authenticateToken, authorizeRoles('admin'), RoleController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin'), RoleController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), RoleController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), RoleController.update);
// No delete para roles

module.exports = router;
