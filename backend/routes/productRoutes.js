const express = require('express');
const router = express.Router();
const ProductCatalogController = require('../controllers/ProductCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), ProductCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin'), ProductCatalogController.getActive);
router.get('/:id', authenticateToken, authorizeRoles('admin'), ProductCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), ProductCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), ProductCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), ProductCatalogController.delete);

module.exports = router;
