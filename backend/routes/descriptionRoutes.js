const express = require('express');
const router = express.Router();
const DescriptionCatalogController = require('../controllers/DescriptionCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), DescriptionCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), DescriptionCatalogController.getActive);
router.get('/all', authenticateToken, authorizeRoles('admin'), DescriptionCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin'), DescriptionCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), DescriptionCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), DescriptionCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), DescriptionCatalogController.delete);

module.exports = router;
