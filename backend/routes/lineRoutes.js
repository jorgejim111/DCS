const express = require('express');
const router = express.Router();
const LineCatalogController = require('../controllers/LineCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), LineCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production'), LineCatalogController.getActive);
router.get('/all', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), LineCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), LineCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), LineCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), LineCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup', 'production', 'produccion'), LineCatalogController.delete);

module.exports = router;
