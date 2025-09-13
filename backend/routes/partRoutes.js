const express = require('express');
const router = express.Router();
const PartCatalogController = require('../controllers/PartCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), PartCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), PartCatalogController.getActive);
router.get('/all', authenticateToken, authorizeRoles('admin'), PartCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin'), PartCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), PartCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), PartCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), PartCatalogController.delete);

module.exports = router;
