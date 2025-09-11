const express = require('express');
const router = express.Router();
const DieDescriptionController = require('../controllers/DieDescriptionController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieDescriptionController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieDescriptionController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente'), DieDescriptionController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente'), DieDescriptionController.update);
// No se elimina nunca un serial

module.exports = router;
