const express = require('express');
const router = express.Router();
const DieSerialController = require('../controllers/DieSerialController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieSerialController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieSerialController.getActive);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieSerialController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieSerialController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieSerialController.update);
router.patch('/:id/activate', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieSerialController.activate);
router.patch('/:id/deactivate', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DieSerialController.deactivate);
// No se elimina nunca un serial

module.exports = router;
