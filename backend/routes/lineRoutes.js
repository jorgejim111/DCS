const express = require('express');
const router = express.Router();
const LineCatalogController = require('../controllers/LineCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), LineCatalogController.getAll);
router.get('/active', authenticateToken, authorizeRoles('admin', 'gerente', 'setupSr', 'setup'), LineCatalogController.getActive);
router.get('/all', authenticateToken, authorizeRoles('admin'), LineCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin'), LineCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), LineCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), LineCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), LineCatalogController.delete);

module.exports = router;
