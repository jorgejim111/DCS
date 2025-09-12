const express = require('express');
const router = express.Router();
const DieDescriptionController = require('../controllers/DieDescriptionController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');


router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieDescriptionController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieDescriptionController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente'), DieDescriptionController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente'), DieDescriptionController.update);
router.patch('/:id/activate', authenticateToken, authorizeRoles('admin', 'gerente'), DieDescriptionController.activate);
router.patch('/:id/deactivate', authenticateToken, authorizeRoles('admin', 'gerente'), DieDescriptionController.deactivate);

module.exports = router;
