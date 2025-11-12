const express = require('express');
const router = express.Router();
const DescriptionDrCatalogController = require('../controllers/DescriptionDrCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DescriptionDrCatalogController.getAll);
router.get('/all', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), DescriptionDrCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DescriptionDrCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DescriptionDrCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DescriptionDrCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), DescriptionDrCatalogController.delete);

module.exports = router;
