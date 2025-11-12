const express = require('express');
const router = express.Router();
const ProductCatalogController = require('../controllers/ProductCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ProductCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), ProductCatalogController.getActive);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ProductCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ProductCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ProductCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ProductCatalogController.delete);

module.exports = router;
