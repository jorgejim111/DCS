const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), UserController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin'), UserController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), UserController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), UserController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), UserController.delete);

module.exports = router;
