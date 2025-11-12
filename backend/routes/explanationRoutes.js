const express = require('express');
const router = express.Router();
const ExplanationCatalogController = require('../controllers/ExplanationCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ExplanationCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), ExplanationCatalogController.getActive);
router.get('/all', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), ExplanationCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ExplanationCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ExplanationCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ExplanationCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), ExplanationCatalogController.delete);

module.exports = router;
