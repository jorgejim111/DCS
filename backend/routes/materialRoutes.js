const express = require('express');
const router = express.Router();
const MaterialCatalogController = require('../controllers/MaterialCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), MaterialCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), MaterialCatalogController.getActive);
router.get('/:id', authenticateToken, authorizeRoles('admin'), MaterialCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), MaterialCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), MaterialCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), MaterialCatalogController.delete);

module.exports = router;
