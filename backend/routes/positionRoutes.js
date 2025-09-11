const express = require('express');
const router = express.Router();
const PositionCatalogController = require('../controllers/PositionCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), PositionCatalogController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin'), PositionCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), PositionCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), PositionCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), PositionCatalogController.delete);

module.exports = router;
